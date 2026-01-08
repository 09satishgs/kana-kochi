# 🌸 Kana-Kochi

<p align="center">
  <img width="1905" height="832" alt="Image" src="https://github.com/user-attachments/assets/3046d738-8661-4908-8d09-7d2f19a95784" />
</p>

<p align="center">
  <strong>Master Japanese Hiragana and Katakana through structured learning, deliberate practice, and play-driven reinforcement.</strong>
</p>

<p align="center">
  🚀 <a href="https://kana-kochi.vercel.app"><strong>View Live Demo</strong></a>
</p>

---

## ⚠️ Important Note for Reviewers

> **This project uses a custom serverless CMS architecture powered by Telegram.**

- 🔊 Audio pronunciations & ✍️ stroke-order videos are **hosted on Telegram**
- 🗂️ Assets are referenced via **Telegram File IDs stored in MongoDB**
- 🔄 Media is fetched dynamically using the **Telegram Bot API**

Because this setup depends on **private bot credentials and seeded DB mappings**,  
this repository is intended for **code inspection and architectural review only**.

👉 **Please use the live app for the full experience:**  
https://kana-kochi.vercel.app

---

## 📖 Overview

**Kana-Kochi** is a Japanese language learning application built with **Next.js 16 (App Router)** and **React 19**.

It helps beginners master **Hiragana and Katakana** using a deliberate **three-layer learning model**:

| Learn                      | Practice                     | Play                   |
| -------------------------- | ---------------------------- | ---------------------- |
| Visual & audio recognition | Stroke order & muscle memory | Gamified reinforcement |

Unlike flashcard-heavy apps, Kana-Kochi focuses on **writing mechanics, recall under pressure, and repetition through interaction** — closer to how humans actually learn scripts.

---

## ✨ Core Learning Model

## 1️⃣ Learning Layer — Interactive Kana Charts

**Purpose:** Visual and auditory recognition

- ✅ Complete Hiragana & Katakana syllabaries
- 🔊 Click / hover to hear accurate pronunciation
- 🎯 Clean, distraction-free layout

### Preview

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/37c8beef-e985-4c1c-84e6-2feabac66d48" alt="Hiragana Chart" /></td>
    <td><img src="https://github.com/user-attachments/assets/80fa4958-9e6b-44aa-8115-d87c4f5e1695" alt="Katakana Chart" /></td>
  </tr>
</table>

---

## 2️⃣ Practice Layer — Stroke Order & Muscle Memory

**Purpose:** Learn _how_ characters are written

- 🎥 Looping stroke-order videos
- ✍️ Interactive drawing canvas
- 🖱️ Optimized for mouse, touchpad & stylus

### Preview

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/f4ac2220-db25-40ef-ac5b-5cd64d851c00" alt="Stroke Video" /></td>
    <td><img src="https://github.com/user-attachments/assets/9784c631-ed70-4637-91ee-05c8bd7e31f5" alt="Practice Canvas" /></td>
  </tr>
</table>

---

## 3️⃣ Gaming Layer — Play-to-Learn Reinforcement

**Purpose:** Stress-test recall and recognition

### 🎧 Mode A — Audio → Character Match

- Hear a sound, pick the correct kana
- Tests auditory recognition & reaction speed

### 🧩 Mode B — Word Construction

- Hear a Japanese word
- Build it by selecting characters in order
- Reinforces sequencing & vocabulary

**Dynamic Difficulty**

- ⏱️ Time limits
- ❤️ Health / lives system

### Preview

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/bdd7198b-361d-4118-9fc7-088d447f2346" alt="Audio Game" /></td>
    <td><img src="https://github.com/user-attachments/assets/51037b06-d963-4bf6-ab1e-27fa6ad3fddd" alt="Word Game" /></td>
  </tr>
</table>

---

## 🏗️ Architecture & Technical Design

**Status:** ✅ Deployed & Active

Kana-Kochi uses a **non-traditional, serverless-friendly architecture** optimized for media-heavy educational content.

### 🔑 Key Decisions

#### 📦 Telegram as Asset Layer

- High-availability media hosting
- Audio & video uploaded once
- Referenced via **Telegram File IDs**

#### 🗂️ MongoDB as Mapping Layer

- Maps kana, words, and asset IDs
- Enables fully data-driven UI rendering

#### 🔄 Runtime Asset Fetching

- Assets fetched securely via Bot API
- UI decoupled from physical asset storage

### 🧪 Local Development (Conceptual)

To make this locally runnable:

- Replace Telegram assets with static placeholders
- Use mock datasets instead of File IDs
- API boundaries already support this swap

---

## 🛠️ Tech Stack

| Category  | Tech                         |
| --------- | ---------------------------- |
| Framework | Next.js 16.0.10 (App Router) |
| UI        | React 19.2.0                 |
| Styling   | Tailwind CSS v4              |
| Database  | MongoDB Atlas (v7)           |
| Tooling   | ESLint                       |

---

## ♿ Accessibility Considerations

- 🎨 High-contrast, readable UI
- 🔊 Audio-based learning modes
- ✍️ Multiple input methods supported

**Planned**

- Keyboard-only navigation
- Improved visual feedback on mistakes

---

## 🔮 Roadmap

- [ ] User authentication & progress sync
- [ ] Global leaderboard & stats
- [ ] Kanji module (stroke-aware, phased rollout)

---

## 📄 License

**Proprietary**

Built for **learning, demonstration, and portfolio use**.
