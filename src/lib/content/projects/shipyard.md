---
slug: shipyard
title: "Shipyard"
description: "A self-hosted PaaS for managing Docker-based infrastructure — deploy, scale, and monitor containers from a single dashboard."
tech: ["Rust", "Axum", "Bollard", "rmqtt", "SvelteKit", "PostgreSQL", "Redis", "Docker"]
repo: ""
demo: "https://shipyard.trian.space"
year: 2025
featured: true
---

# Shipyard

> **This site runs on Shipyard.** The container serving this portfolio was deployed, scaled, and is monitored through this exact dashboard.

A self-hosted PaaS I built for my own infrastructure — inspired by [Dokploy](https://dokploy.com) and [Railway](https://railway.app), but built from scratch because I wanted to understand how it actually works, not just use it.

## Why I built it

I have several personal projects running on a VPS. Managing them manually meant SSH-ing in, pulling new images, restarting containers, and hoping the reverse proxy config didn't break. I kept eyeing Coolify and Dokploy but kept thinking: *I could build this.* So I did.

It's not meant to compete with production PaaS products. It's a learning project that became useful enough to replace my previous workflow entirely.

## Screenshots
![Homepage](/screenshots/shipyard/landing.webp)
![Dashboard — project list](/screenshots/shipyard/workspace.webp)
![Deploy panel](/screenshots/shipyard/deploy.webp)
![Container inspect](/screenshots/shipyard/inspect.webp)

## How it works

The backend is written in **Rust** using **Axum** as the HTTP framework. Docker containers are managed through **Bollard** — the idiomatic Rust client for the Docker Engine API — which gives direct control over creating, starting, stopping, and inspecting containers without shelling out to the Docker CLI.

**rmqtt** (an MQTT broker written in Rust) handles the real-time message bus between the backend and dashboard. When a container's state changes — starting, unhealthy, stopped — an MQTT event is published and the SvelteKit frontend subscribes over WebSocket to update the UI instantly, without polling.

**PostgreSQL** stores all project and deployment state. **Redis** is used for ephemeral data: session caching, short-lived deploy tokens, and rate limiting.

The frontend dashboard is built in **SvelteKit** — same stack as this portfolio. It connects to the MQTT broker via WebSocket for live container logs and status updates.

## Stack

```toml
[backend]
language = "Rust"
http     = "Axum"
docker   = "Bollard"
broker   = "rmqtt (MQTT over WebSocket)"
database = "PostgreSQL"
cache    = "Redis"

[frontend]
framework = "SvelteKit + TypeScript"
realtime  = "MQTT over WebSocket"

[infrastructure]
runtime    = "Docker"
proxy      = "Traefik"
deployment = "Self-hosted VPS"
```

## What it can do

- **Project-based deployments** — group services into projects, deploy from a Docker image or Git repository
- **Real-time logs** — streamed from the container via MQTT, no polling
- **Reverse proxy management** — dynamic Traefik config per service with automatic HTTPS
- **Container lifecycle** — start, stop, restart, redeploy from the dashboard
- **Multi-org support** — separate namespaces for different projects or teams
