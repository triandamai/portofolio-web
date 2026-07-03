---
slug: arta
title: "Arta"
description: "Cross-platform expenses tracker built with Compose Multiplatform — scan receipts with OCR for instant logging, manage budgets, and keep pocket money in check."
tech: ["Kotlin", "Compose Multiplatform", "OCR", "SQLDelight"]
repo: ""
demo: ""
year: 2024
featured: false
---

# Arta

> I kept telling myself I'd track my spending. I never did — until I made it fast enough that there was no excuse not to.

## Screenshots
![Dashboard](/screenshots/arta/home.webp)
![Scan receipt](/screenshots/arta/receipt.webp)
![Expense history](/screenshots/arta/history.webp)

## The motivation

The honest reason: I had no idea where my money was going. I'd check my balance at the end of the month and it was always less than expected, and I couldn't account for the difference.

Every expenses app I tried felt like work. Open app, tap add, fill in amount, category, date, note, save. By the time the flow was done I'd already decided it wasn't worth it for a Rp 15,000 snack.

So I built **Arta** around one idea: logging an expense should take under five seconds.

## OCR for quick tracking

The fastest path to logging is pointing your camera at a receipt and letting the app read it. Arta uses **OCR** to scan receipts and extract the total amount automatically — you confirm or correct, pick a category, done.

For the times you don't have a receipt, the manual entry is a single-field input: just the amount. Category and date default intelligently and can be adjusted after.

## Why Compose Multiplatform

I spend most of my time writing Android apps in Jetpack Compose. **Compose Multiplatform** let me reuse virtually all of the UI and business logic to also target desktop — useful for reviewing monthly summaries on a larger screen without syncing to a web service.

It was also a good excuse to properly learn CMP's expect/actual pattern and see how much of a real app could genuinely share code across targets.

## Stack

```toml
[app]
framework = "Compose Multiplatform"
language  = "Kotlin"
targets   = ["Android", "Desktop"]

[data]
local_db  = "SQLDelight"
ocr       = "ML Kit Text Recognition"

[features]
quick_log = "OCR receipt scan → one-tap confirm"
manual    = "Single-field amount entry with smart defaults"
reports   = "Monthly breakdown by category"
```
