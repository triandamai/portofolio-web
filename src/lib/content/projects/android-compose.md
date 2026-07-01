---
slug: android-compose
title: "E-Commerce Android App"
description: "A production Android e-commerce app built from 0 to 1 with Jetpack Compose and Clean Architecture."
tech: ["Kotlin", "Jetpack Compose", "Ktor", "Room", "Coroutines"]
repo: "https://github.com/triandamai"
demo: ""
year: 2022
featured: true
---

# E-Commerce Android App

A full-featured Android shopping application built from scratch. Handles product browsing, cart management, checkout, and order tracking for a client in retail.

## Architecture

```
app/
├── data/          # Room DB, Retrofit/Ktor clients, repositories
├── domain/        # Use cases, domain models, repository interfaces  
├── presentation/  # Compose UI, ViewModels
└── di/            # Hilt dependency injection
```

Clean Architecture with Jetpack Compose UI layer. Each feature module owns its own navigation graph, enabling parallel team development.

## Key features

- **Offline-first** — Room DB as single source of truth, sync on reconnect
- **Real-time cart sync** — WebSocket keeps cart in sync across devices
- **Compose animations** — shared element transitions, skeleton loading states
- **Modular navigation** — Type-safe nav with Compose Navigation + SavedStateHandle

## Result

Shipped to Google Play with 4.6★ rating. 40% reduction in reported latency vs. previous native (XML) version.
