---
slug: cekmotor
title: "cekmotor.id"
description: "AI-powered motorcycle appraisal SaaS — analyze physical condition, estimate fair market value, and compare against live marketplace listings."
tech: ["Next.js", "Rust", "PostgreSQL", "Gemini AI"]
repo: ""
demo: "https://cekmotor.id"
year: 2025
featured: true
---

# cekmotor.id

> Buying or selling a used motorcycle in Indonesia shouldn't be a gamble. **cekmotor.id** gives you an AI-powered appraisal in minutes — not a gut feeling.

## Screenshots
![Home flow](/screenshots/cekmotor/home.webp)
![AI Process](/screenshots/cekmotor/analyze.webp)
![AI condition report](/screenshots/cekmotor/result1.webp)
![AI condition report](/screenshots/cekmotor/result2.webp)
![AI condition report](/screenshots/cekmotor/result3.webp)
![Dealer dashboard](/screenshots/cekmotor/dashboard.webp)

## How it started

It started with a hangout session at **Tele Cexup** with a friend. We were just talking — the usual kind of conversation that jumps between random topics — until we landed on something that actually bothered both of us: *how do you know if a used motorcycle is worth the asking price?*

You check OLX, Tokopedia, Facebook Marketplace — prices are all over the place. You ask a mechanic friend, but they don't always have time. You look at the condition yourself, but unless you really know motorcycles, you're guessing.

That's the gap we wanted to close. By the end of that conversation, **cekmotor.id** had a name and a direction.

## What it does

cekmotor.id is a SaaS platform that helps users appraise used motorcycles with the help of AI:

- **Condition analysis** — upload photos of the motorcycle (body, engine, odometer, documents); the AI flags signs of wear, damage, or tampering
- **Market price estimation** — cross-references the bike's specs, year, mileage, and condition against real-time listings from major Indonesian marketplaces
- **Appraisal report** — generates a structured report with a recommended price range, condition score, and red flags to negotiate with
- **Dealer & workshop mode** — batch appraisals for shops managing multiple units, with history and comparison tools

## The problem in numbers

Indonesia has one of the largest used motorcycle markets in Southeast Asia. Tens of millions of units change hands every year, mostly through informal peer-to-peer channels where information asymmetry is the norm. Sellers overprice, buyers underpay for damaged units, and neither side has a reliable reference point.

## Stack

```toml
[backend]
language  = "Rust"
database  = "PostgreSQL"

[frontend]
framework = "Next.js"
purpose   = "Web dashboard, appraisal reports, dealer portal"

[ai]
provider  = "Gemini AI"
use_cases = ["Condition analysis from photos", "Market price estimation", "Report generation"]
```

## Status

Currently in early development. The core appraisal engine is being trained on scraped marketplace data. Mobile app prototype is in progress.

This is a product born from a real frustration, and we're building it the way we'd want to use it.
