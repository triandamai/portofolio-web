// Axum Server-Sent Events (SSE) Broadcast & Target System
// Implements client tracking, heartbeat (ping) checks, and selective routing.

use axum::Json;
use axum::response::{IntoResponse, Response, Sse};
use axum::response::sse::{Event, KeepAlive};
use futures::Stream;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::convert::Infallible;
use std::sync::{Arc, Mutex};
use std::time::Duration;
use tokio::spawn;
use tokio::sync::mpsc;
use tokio::sync::mpsc::Sender;
use tokio::time::interval;
use tokio_stream::StreamExt;
use tokio_stream::wrappers::ReceiverStream;

// Mock response payload structure (matches ApiResponse used inside SseBroadcaster)
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ApiResponse {
    pub status: String,
    pub message: String,
}

impl ApiResponse {
    pub fn ok(status: String, message: &str) -> Self {
        ApiResponse {
            status,
            message: message.to_string(),
        }
    }
}

// ==========================================
// 1. SSE Target & Builder Definitions
// ==========================================

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct SseTarget {
    user_id: Vec<String>,
    device_id: String,
    event_name: String,
    is_broadcast: bool,
    is_to_device: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct SseBuilder<T> {
    target: SseTarget,
    pub data: Option<T>,
}

impl SseTarget {
    pub fn create() -> Self {
        SseTarget {
            user_id: vec![],
            device_id: "".to_string(),
            event_name: "".to_string(),
            is_broadcast: false,
            is_to_device: false,
        }
    }

    pub fn broadcast(event_name: String) -> Self {
        SseTarget {
            user_id: vec![],
            device_id: "".to_string(),
            event_name,
            is_broadcast: true,
            is_to_device: false,
        }
    }

    pub fn set_event_name(mut self, event_name: String) -> Self {
        self.event_name = event_name;
        self
    }

    pub fn set_user_id(mut self, user_id: String) -> Self {
        self.user_id = vec![user_id];
        self
    }

    pub fn set_user_ids(mut self, user_ids: Vec<String>) -> Self {
        self.user_id = user_ids;
        self
    }

    pub fn set_device_id(mut self, device_id: String) -> Self {
        self.device_id = device_id;
        self.is_to_device = true;
        self
    }

    pub fn device_id(&self) -> &String {
        &self.device_id
    }

    pub fn even_name(&self) -> &String {
        &self.event_name
    }

    pub fn user_id(&self) -> &Vec<String> {
        &self.user_id
    }

    pub fn is_broadcast(&self) -> bool {
        self.is_broadcast
    }

    pub fn is_to_device(&self) -> bool {
        self.is_to_device
    }
}

impl<T> SseBuilder<T> {
    pub fn new(target: SseTarget, data: T) -> SseBuilder<T> {
        SseBuilder {
            target,
            data: Some(data),
        }
    }

    pub fn get_target(&self) -> &SseTarget {
        &self.target
    }
}

impl<T> IntoResponse for SseBuilder<T>
where
    T: Serialize,
{
    fn into_response(self) -> Response {
        Json(self).into_response()
    }
}

// ==========================================
// 2. SSE Broadcaster Implementation
// ==========================================

#[derive(Debug)]
pub struct SseBroadcaster {
    inner: Mutex<SseBroadcasterInner>,
}

#[derive(Debug, Clone, Default)]
pub struct SseBroadcasterInner {
    // Structure: HashMap<user_id, HashMap<device_id, Sender<Event>>>
    clients: HashMap<String, HashMap<String, Sender<Event>>>,
}

impl SseBroadcaster {
    pub fn create() -> Arc<Self> {
        let this = Arc::new(SseBroadcaster {
            inner: Mutex::new(SseBroadcasterInner::default()),
        });
        SseBroadcaster::spawn_ping(Arc::clone(&this));
        this
    }

    /// Pings clients every 15 seconds to see if they are alive and removes stale connections.
    fn spawn_ping(this: Arc<Self>) {
        spawn(async move {
            let mut interval = interval(Duration::from_secs(15));
            loop {
                interval.tick().await;
                this.remove_stale_client().await;
            }
        });
    }

    /// Removes ALL non-responsive clients from the broadcast list.
    async fn remove_stale_client(&self) {
        let clients = self.inner.lock().unwrap().clients.clone();
        let mut ok_client = HashMap::new();

        for (key, users) in clients {
            let mut ok_subs: HashMap<String, Sender<Event>> = HashMap::new();
            for (device, client) in users {
                if client
                    .send(Event::default().event(":ping").comment("ping"))
                    .await
                    .is_ok()
                {
                    ok_subs.insert(device, client);
                }
            }
            if !ok_subs.is_empty() {
                ok_client.insert(key, ok_subs);
            }
        }
        self.inner.lock().unwrap().clients = ok_client;
    }

    /// Registers a new user device connection and streams back the events channel.
    pub async fn new_client<'a>(
        &self,
        user_id: String,
        device_id: String,
    ) -> Sse<impl Stream<Item = Result<Event, Infallible>> + use<'a>> {
        let (tx, rx) = mpsc::channel(10);
        let event = Event::default()
            .event("connected")
            .json_data(ApiResponse::ok("CONNECTED".to_string(), "Success"))
            .unwrap();

        tx.send(event).await.unwrap();
        let stream = ReceiverStream::<Event>::new(rx).map(Ok);

        let mut subs = match self.inner.lock().unwrap().clients.get(&user_id) {
            None => HashMap::new(),
            Some(client) => client.clone(),
        };

        subs.insert(device_id.clone(), tx.clone());
        self.inner
            .lock()
            .unwrap()
            .clients
            .insert(user_id.clone(), subs);

        Sse::new(stream).keep_alive(KeepAlive::default())
    }

    /// Helper for rejecting client connection configurations gracefully.
    pub async fn reject_client(&self) -> Result<String, String> {
        let (tx, _) = mpsc::channel(10);

        let event = Event::default()
            .event("connection")
            .json_data(ApiResponse::ok(
                "Rejected".to_string(),
                "Failed to subscribe",
            ))
            .unwrap();

        let _ = tx.send(event).await.unwrap();
        tx.closed().await;

        Ok("Ok".to_string())
    }

    /// Routes the structured SseBuilder event to target user(s), device, or broadcasts it.
    pub async fn send<T: serde::Serialize>(&self, builder: SseBuilder<T>) {
        let target = builder.get_target();
        if target.is_broadcast() {
            self.broadcast(&target.even_name(), &builder.data).await;
        } else if target.is_to_device() {
            for user in target.user_id() {
                self.send_to_user_device(
                    user,
                    target.device_id(),
                    &target.even_name(),
                    &builder.data,
                )
                .await;
            }
        } else {
            for user in target.user_id() {
                self.send_to_user(user, &target.even_name(), &builder.data).await;
            }
        }
    }

    async fn broadcast<T: serde::Serialize>(&self, event_name: &String, data: &Option<T>) {
        let clients = self.inner.lock().unwrap().clients.clone();
        if let Some(payload) = data {
            let event = Event::default().event(event_name).json_data(payload).unwrap();
            for (_, users) in clients {
                for (_, client) in users {
                    let _ = client.send(event.clone()).await;
                }
            }
        }
    }

    async fn send_to_user<T: serde::Serialize>(
        &self,
        user_id: &String,
        event_name: &String,
        data: &Option<T>,
    ) {
        let clients = self.inner.lock().unwrap().clients.clone();
        if let Some(users) = clients.get(user_id) {
            if let Some(payload) = data {
                let event = Event::default().event(event_name).json_data(payload).unwrap();
                for (_, client) in users {
                    let _ = client.send(event.clone()).await;
                }
            }
        }
    }

    async fn send_to_user_device<T: serde::Serialize>(
        &self,
        user_id: &String,
        device_id: &String,
        event_name: &String,
        data: &Option<T>,
    ) {
        let clients = self.inner.lock().unwrap().clients.clone();
        if let Some(users) = clients.get(user_id) {
            if let Some(client) = users.get(device_id) {
                if let Some(payload) = data {
                    let event = Event::default().event(event_name).json_data(payload).unwrap();
                    let _ = client.send(event).await;
                }
            }
        }
    }

    pub async fn get_list_client(&self) -> Option<HashMap<String, Vec<String>>> {
        let clients = self.inner.lock().unwrap().clients.clone();
        let mut data: HashMap<String, Vec<String>> = HashMap::new();

        clients.iter().for_each(|(key, sub)| {
            let items = sub.iter().map(|(k, _)| k.clone()).collect();
            data.insert(key.clone(), items);
        });

        Some(data)
    }
}

// ==========================================
// 3. Example Usage in an Axum Web Application
// ==========================================
//
// Below is a complete implementation example showing how to mount this broadcaster 
// inside an Axum router and send targeted messages to users.
//
// ```rust
// use axum::{
//     routing::{get, post},
//     Router, Extension, extract::{Path, Query, State},
//     response::IntoResponse,
// };
//
// #[derive(serde::Deserialize)]
// struct ClientQuery {
//     device_id: String,
// }
//
// #[derive(Serialize)]
// struct NotificationPayload {
//     title: String,
//     message: String,
// }
//
// // Handler: Subscribe user device to SSE stream
// async fn sse_handler(
//     Path(user_id): Path<String>,
//     Query(query): Query<ClientQuery>,
//     State(broadcaster): State<Arc<SseBroadcaster>>,
// ) -> impl IntoResponse {
//     broadcaster.new_client(user_id, query.device_id).await
// }
//
// // Handler: Send a mock targeted push event to a specific user
// async fn send_event_handler(
//     State(broadcaster): State<Arc<SseBroadcaster>>,
// ) -> impl IntoResponse {
//     let target = SseTarget::create()
//         .set_user_id("user_99".to_string())
//         .set_event_name("alert".to_string());
//
//     let payload = SseBuilder::new(
//         target,
//         NotificationPayload {
//             title: "Security Alert".to_string(),
//             message: "A login attempt was made from a new location".to_string(),
//         },
//     );
//
//     broadcaster.send(payload).await;
//     "Targeted notification sent!"
// }
//
// #[tokio::main]
// async fn main() {
//     // Initialize our thread-safe broadcaster
//     let broadcaster = SseBroadcaster::create();
//
//     // Setup router
//     let app = Router::new()
//         .route("/sse/:user_id", get(sse_handler))
//         .route("/trigger", post(send_event_handler))
//         .with_state(broadcaster);
//
//     // Bind and run
//     let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
//     println!("Server running on http://localhost:8080");
//     axum::serve(listener, app).await.unwrap();
// }
// ```
