# 🌸 Kana-Kochi

<p align="center">
  <img width="3840" height="2160" alt="Hero" src="https://github.com/user-attachments/assets/01fd40f3-d8dc-466e-abcd-4e88d49393e7" />
</p>

<p align="center">
  <strong>Master Japanese Hiragana and Katakana through Learning, Practice, and Play.</strong>
</p>

<p align="center">
  🚀 <a href="https://kana-kochi.vercel.app"><strong>View Live Demo</strong></a>
</p>

---

## 📌 What is Kana-Kochi?

**Kana-Kochi** is a Japanese language learning application built with **Next.js 16 (App Router)** and **React 19**.

It helps beginners master **Hiragana and Katakana** using a deliberate, three-layer learning model:

| Learn | Practice | Play |
|------|---------|------|
| Visual & audio recognition | Stroke order & muscle memory | Gamified reinforcement |

Unlike traditional flashcard-based apps, Kana-Kochi focuses on:
- ✍️ **Muscle memory**
- 🧠 **Active recall**
- ⏱️ **Reinforcement under pressure**

This mirrors how written scripts are actually learned.

---

## ✨ Core Features

### 1️⃣ Learn — Interactive Kana Charts
- Complete Hiragana & Katakana syllabaries
- Click or hover to hear pronunciation
- Designed for clean, distraction-free memorization

### 2️⃣ Practice — Stroke Mastery
- Stroke-order reference videos
- Interactive drawing canvas
- Optimized for mouse, touchpad, and stylus

### 3️⃣ Play — Gamified Reinforcement
- Audio → character matching
- Word construction challenges
- Difficulty scaling using time limits and lives

---

## 🏆 Progress & Achievements

Kana-Kochi tracks meaningful progress signals, including:
- Time spent across **Learn / Practice / Play**
- Best completion times per level
- Longest streaks
- Total wins and game overs
- Per-script and per-mode breakdowns
- Account creation date for long-term context

This data is used to reinforce consistency and improvement over time.

---

## 🧪 Running Locally & Architecture

This project uses a **custom asset delivery architecture**:
- Visual stroke assets are hosted via **Telegram**
- Data and progress are stored in **MongoDB Atlas**
- Audio playback uses the browser **SpeechSynthesis API**

Running the app locally is fully possible, but **intentionally non-trivial**, as it mirrors real-world system complexity.

👉 **To run the app locally or experiment with the architecture, follow the step-by-step guide here:**  
📄 **[`ARCHITECTURE.md`]([./ARCHITECTURE.md](https://github.com/user-attachments/files/24499337/test.file.pdf))**

This guide explains:
- How the Telegram-based asset pipeline works
- How to set up MongoDB schemas
- How all systems connect at runtime

---

## 🛠️ Tech Stack

| Category | Technology |
|--------|------------|
| Framework | Next.js 16.0.10 (App Router) |
| UI | React 19.2.0 |
| Styling | Tailwind CSS v4 |
| Database | MongoDB Atlas (v7) |
| Tooling | ESLint |

---

## 🔮 Roadmap (Release 2.0)

- Low-friction authentication & cross-device progress sync
- App personalization (themes, usernames)
- Voice customization & progress reset
- Kanji learning pipeline

---

## 📄 License

**Proprietary**

Built for **learning, experimentation, and portfolio demonstration**.
