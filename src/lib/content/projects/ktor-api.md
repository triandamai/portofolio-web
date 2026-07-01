---
slug: ktor-api
title: "Ktor REST + WebSocket API"
description: "A high-throughput backend API in Kotlin/Ktor with PostgreSQL, JWT auth, and real-time WebSocket channels."
tech: ["Kotlin", "Ktor", "PostgreSQL", "JWT", "WebSockets", "Docker"]
repo: "https://github.com/triandamai"
demo: ""
year: 2023
featured: true
---

# Ktor REST + WebSocket API

A production backend service powering a real-time collaboration tool. Built in pure Kotlin with Ktor — no Spring overhead, just a fast async server with exactly what was needed.

## Why Ktor

Ktor's coroutine-native model made WebSocket and HTTP/2 handling natural to reason about. The serialization and routing DSLs are clean. Starting from scratch meant zero magic and full ownership.

## Architecture

```kotlin
fun Application.configure() {
    install(Authentication) { jwt("auth-jwt") { /* ... */ } }
    install(WebSockets)
    install(ContentNegotiation) { json() }
    routing {
        authenticate("auth-jwt") {
            usersRoutes()
            projectsRoutes()
            wsCollaborationRoutes()  // real-time channel
        }
    }
}
```

## Highlights

- **Structured concurrency** — each WebSocket session runs in a supervised coroutine scope; crash in one session never affects others
- **Connection pool** — HikariCP + exposed ORM for PostgreSQL, connection pool tuned for 500 concurrent users
- **JWT refresh flow** — short-lived access tokens + rotating refresh tokens stored server-side for revocation
- **Docker + GitHub Actions** — zero-downtime blue/green deploys via Nginx upstream swap

## Performance

Handles 2,000 req/s on a single 2-vCPU instance. WebSocket latency p95 < 15ms.
