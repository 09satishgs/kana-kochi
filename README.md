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
## 🖼️ App Previews
<table>
  <thead>
    <tr>
      <th colspan="12" align="center">Kana Kochi Screenshots</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th colspan="12" align="center">📖 Learning Layer (Interactive Charts)</th>
    </tr>
    <tr>
      <td colspan="7"><img src="https://github.com/user-attachments/assets/478d6e2b-f44b-4197-9ea0-39210ca18eb3" alt="Kana Chart Overview" /></td>
      <td colspan="5"><img src="https://github.com/user-attachments/assets/c9646ad6-1dc8-4cb9-bfe6-596c3920bb0b" alt="Full Kana Chart" /></td>
    </tr>
    <tr>
      <th colspan="12" align="center">✍️ Practice Layer (Stroke Mastery)</th>
    </tr>
    <tr>
      <td colspan="7">
        <img src="https://github.com/user-attachments/assets/625bce3d-35b6-40c5-b979-07f55f8c8ae3" alt="Stroke Reference" />
      <img src="https://github.com/user-attachments/assets/bd375da1-1ded-4898-9c87-c11ec2e924f3" alt="Practice Canvas" />
      </td>
      <td colspan="5"><img src="https://github.com/user-attachments/assets/26c522e5-79c4-43db-b7f1-36c9d5421977" alt="Stroke Practice" /></td>
    </tr>
    <tr>
      <th colspan="12" align="center">🎮 Gaming Layer (Modes & Challenges)</th>
    </tr>
    <tr>
      <td colspan="4"><img src="https://github.com/user-attachments/assets/e0fed41b-f616-43d3-9509-29476da676ec" alt="Game Mode 1" /></td>
      <td colspan="4"><img src="https://github.com/user-attachments/assets/f1439252-0a97-416d-aba7-7a261d44680a" alt="Game Mode 2" /></td>
      <td colspan="4"><img src="https://github.com/user-attachments/assets/cf856f07-9332-45a0-bdfd-115b249013f2" alt="Game Mode 3" /></td>
    </tr>
    <tr>
      <td colspan="4"><img src="https://github.com/user-attachments/assets/5f88acd8-ed27-4e6c-9609-c39ac97fcfdf" alt="Game Mode 4" /></td>
      <td colspan="4"><img src="https://github.com/user-attachments/assets/3db15478-8280-4ab3-bd89-07971c6614cd" alt="Game Mode 5" /></td>
      <td colspan="4"><img src="https://github.com/user-attachments/assets/85f80f4a-1274-4492-b1a7-580383152132" alt="Game Summary" /></td>
    </tr>
    <tr>
      <td colspan="12" align="center">
        <img src="https://github.com/user-attachments/assets/6e45d102-acc3-4c70-9ec1-0f3c08f0d976" alt="Wide Game View" width="100%" />
      </td>
    </tr>
    <tr>
      <th colspan="12" align="center">🏆 Stats, Settings & Navigation</th>
    </tr>
    <tr>
      <td colspan="4"><img src="https://github.com/user-attachments/assets/910bcb8b-20ac-45a5-95b2-d0997168a11f" alt="Achievements" /></td>
      <td colspan="4"><img src="https://github.com/user-attachments/assets/27a6078e-eae3-49d8-87af-68aea8859ef3" alt="Settings Page" /></td>
      <td colspan="4"><img src="https://github.com/user-attachments/assets/fd46164b-323d-43ee-b092-555ed18ed9a5" alt="Quick Nav" /></td>
    </tr>
  </tbody>
</table>


## 🧪 Running Locally & Architecture

This project uses a **custom asset delivery architecture**:
- Visual stroke assets are hosted via **Telegram**
- Data and progress are stored in **MongoDB Atlas**
- Audio playback uses the browser **SpeechSynthesis API**

Running the app locally is fully possible, but **intentionally non-trivial**, as it mirrors real-world system complexity.

👉 **To run the app locally or experiment with the architecture, follow the step-by-step guide here:**  
📄 **[`Architecture_Notes.pdf`](https://github.com/user-attachments/files/24499612/KanaKochi_Architecture_Notes.pdf)**

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
