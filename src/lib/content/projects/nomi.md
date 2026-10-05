---
slug: nomi
title: "Nomi"
description: "Self-hosted AI agent orchestrator in Rust — one ongoing chat per user, with specialist agents handing work in and out of the same thread."
tech: ["Rust", "Axum", "SvelteKit", "PostgreSQL", "pgvector", "MQTT"]
repo: "https://github.com/triandamai/nomi-v2"
demo: "https://nomi.trian.space"
year: 2026
featured: true
---

# Nomi

> One conversation, many agents. You keep chatting in the same thread; Nomi decides which specialist should pick up the work.

## What it is

**Nomi** is an AI agent orchestrator written in Rust. Every user gets one persistent, chat-app-style thread. Most turns are answered directly. When a message needs real work, Nomi hands it to a short-lived specialist agent with its own prompt and its own tools, then takes the thread back. From the user's side it is one continuous chat, never a "new session".

## The agents

- **Chitchat** — the default, always-on agent, answering with memory and recent history folded in
- **Supervisor** — routes each turn: continue an active agent, spawn a new one, or answer directly
- **Money** — advisory only: lists, categorizes and summarizes spending, with no tool that can move funds
- **Planning** and **Coding** — multi-step work that needs a stronger model
- **Reminders** — plain "remind me to…" with Done and Snooze, no model call when they fire
- **Workspace** — works in the user's own Google account (Gmail, Sheets, Docs, Drive, Calendar)
- **Files** — reads attachments and voice-note transcripts first, then hands the right parts to the right agent

## How a turn flows

1. The message is saved to the thread immediately, so nothing is lost if a later step fails.
2. The text is embedded and matched against long-term memory in **pgvector**, re-ranked by a per-memory weight.
3. The supervisor routes the turn to an agent or answers it directly.
4. The reply is stored and an event is published on **MQTT**, relayed to the web app over WebSockets.
5. Feedback nudges the weight of the memories that shaped the answer, so retrieval gets better for each person over time without retraining a model.

## Multi-model by design

A provider layer lets each agent use the model that fits the job: a cheap model for chitchat and routing, a stronger one for planning or financial reasoning. Providers include **OpenAI**, **Anthropic**, **Gemini**, **DeepSeek** and **OpenRouter**.

## Guardrails

Each agent gets a hard tool allow-list. The money agent simply has no payment or transfer tool registered, so there is no prompt-injection path to a real transaction. Every recommendation is written to an audit table, and the event schema already models a human-approval step for when real actions come later.

## What's next

Telegram and WhatsApp channels, so the same thread follows you outside the web app.

## Stack

```ts
const stack = {
  backend:   ["Rust", "Axum", "Tokio", "SQLx"],
  storage:   ["PostgreSQL", "pgvector"],
  realtime:  ["MQTT (rumqttc)", "WebSockets"],
  frontend:  ["SvelteKit", "Tailwind CSS"],
  models:    ["OpenAI", "Anthropic", "Gemini", "DeepSeek", "OpenRouter"],
};
```
