---
slug: uniflor
title: "uniflor.ac.id"
description: "Full-stack revamp of Universitas Flores' company profile — rebuilt on new infrastructure after the original site was completely taken over by online gambling content."
tech: ["Nuxt.js", "Supabase", "Cloudflare", "Docker Swarm"]
repo: ""
demo: "https://uniflor.ac.id/?lang=id"
year: 2024
featured: true
---

# uniflor.ac.id

> The old site didn't just have bugs — it was serving gambling ads to university students. We burned it down and built something that couldn't happen again.

## Screenshots
![Homepage](/screenshots/uniflor/home.webp)
![Faculty page](/screenshots/uniflor/faculty.webp)
![Mobile view](/screenshots/uniflor/mobile.webp)

## How it started

The website for **Universitas Flores** — a university in Ende, NTT — had been repeatedly compromised over the years. It was running on an old server with outdated software, and the attacks kept coming. The team patched, the attackers returned.

Then one day the site was completely replaced with **judi online** (online gambling) content. Fully defaced. A university's public face, serving slot machine ads.

That was the moment it stopped being a maintenance problem and became a rebuild.

## What we found

We started with an investigation. The root cause wasn't a single vulnerability — it was the environment itself:

- The server was running a version of the OS so old that modern package managers wouldn't work on it
- We couldn't install Docker due to kernel version incompatibilities
- The CMS had unpatched CVEs that had been public for years
- File permissions were wide open — once someone was in, they could write anywhere

There was no safe way to patch this incrementally. The only real fix was a clean break.

## What we built

We provisioned a new server from scratch, designed the infrastructure properly, and migrated everything over.

The web platform is built on **Nuxt.js** with a **server-driven UI** architecture — the frontend dynamically builds its layout based on content records from **Supabase**, rather than having hardcoded page structures. This means faculty editors can publish and restructure pages without touching code.

**Cloudflare** sits in front of everything: DDoS protection, WAF rules, caching, and SSL — layers of defence that weren't there before.

For orchestration we use **Docker Swarm**, which fit the team's operational familiarity better than Kubernetes while still giving us proper container isolation, rolling updates, and service health checks.

## Auto-provisioning subdomains

One of the more interesting parts of the system: each faculty has its own subdomain (e.g., `fkip.uniflor.ac.id`, `fh.uniflor.ac.id`). When a new faculty subdomain is needed, the system automatically:

1. Provisions a new container from a template
2. Registers the subdomain in Cloudflare via API
3. Wires up the reverse proxy routing
4. Seeds the faculty's initial content from Supabase

No manual server configuration per faculty. The old setup required SSH access and manual nginx edits every time.

## Journal repository migration

The university also runs several academic journals, each previously hosted on their own fragile legacy setups. We containerised each journal, brought them under the same infrastructure umbrella, hardened their configurations, and put them behind Cloudflare.

## Stack

```toml
[frontend]
framework = "Nuxt.js"
pattern   = "Server-driven UI — layout built from Supabase content records"

[backend]
database  = "Supabase (PostgreSQL + Auth + Storage)"
cdn_waf   = "Cloudflare (DDoS, WAF, cache, SSL, DNS API)"

[infrastructure]
runtime       = "Docker Swarm"
provisioning  = "Auto-container + Cloudflare DNS API per subdomain"
reverse_proxy = "Traefik"

[security]
layers = ["Cloudflare WAF", "Container isolation", "Hardened file permissions", "Regular CVE patching"]
```

## My role

I was the **full-stack engineer and system architect** on this project — the person behind the scene who designed the infrastructure, planned the migration path, built the server-driven UI system, and implemented the auto-provisioning pipeline.

The old site got hacked because nobody owned the system design. This time, we made sure someone did.
