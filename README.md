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

## ⚠️ Note to Visitors

> This repository is intended for **showcase and code inspection purposes only**.

- The application relies on **private Telegram Bot API keys** for asset hosting
- Media assets are mapped via a **proprietary MongoDB dataset** (character → file ID mappings)
- As these credentials and datasets are not public, the project is **not designed to run locally**

👉 **For the complete experience, please use the live application:**  
https://kana-kochi.vercel.app

---

## 📖 Overview

**Kana-Kochi** is a Japanese language learning application built with **Next.js 16 (App Router)** and **React 19**.

It helps beginners master **Hiragana and Katakana** using a deliberate **three-layer learning model**:

| Learn                      | Practice                     | Play                   |
| -------------------------- | ---------------------------- | ---------------------- |
| Visual & audio recognition | Stroke order & muscle memory | Gamified reinforcement |

Unlike standard flashcard-based apps, Kana-Kochi focuses on **muscle memory**, **active recall**, and **reinforcement under pressure**, closely mirroring how written scripts are actually learned.

---

## ✨ Key Features

## 1️⃣ Learning Layer — Interactive Kana Charts

**Purpose:** Visual and auditory memorization

- ✅ Complete Hiragana & Katakana syllabaries
- 🔊 Hover or click to hear accurate pronunciation
- 🎯 Designed to establish recognition before writing

### Preview

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/478d6e2b-f44b-4197-9ea0-39210ca18eb3" alt="Kana Chart Overview" /></td>
    <td><img src="https://github.com/user-attachments/assets/c9646ad6-1dc8-4cb9-bfe6-596c3920bb0b" alt="Full Kana Chart" /></td>
  </tr>
</table>

---

## 2️⃣ Practice Layer — Stroke Mastery

**Purpose:** Build writing mechanics and muscle memory

- 🎥 Looping stroke-order reference videos
- ✍️ Interactive drawing canvas for immediate practice
- 🖱️ Optimized for mouse, touchpad, and stylus input

### Preview

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/625bce3d-35b6-40c5-b979-07f55f8c8ae3" alt="Stroke Reference" /></td>
    <td><img src="https://github.com/user-attachments/assets/26c522e5-79c4-43db-b7f1-36c9d5421977" alt="Stroke Practice" /></td>
  </tr>
  <tr>
    <td colspan="2"><img src="https://github.com/user-attachments/assets/bd375da1-1ded-4898-9c87-c11ec2e924f3" alt="Practice Canvas" /></td>
  </tr>
</table>

---

## 3️⃣ Gaming Layer — Gamified Reinforcement

**Purpose:** Stress-test recall through play

### 🎧 Mode A — Audio → Character Match

- Hear a sound, identify the correct kana
- Tests auditory recognition and reaction speed

### 🧩 Mode B — Pick the Correct Word

- Hear a Japanese word
- Construct it by selecting characters in sequence
- Reinforces vocabulary and ordering

**Dynamic Difficulty Scaling**

- ⏱️ Time limits
- ❤️ Health / lives system

### Preview

<table>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/e0fed41b-f616-43d3-9509-29476da676ec" alt="Game Mode 1" /></td>
    <td><img src="https://github.com/user-attachments/assets/f1439252-0a97-416d-aba7-7a261d44680a" alt="Game Mode 2" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/cf856f07-9332-45a0-bdfd-115b249013f2" alt="Game Mode 3" /></td>
    <td><img src="https://github.com/user-attachments/assets/5f88acd8-ed27-4e6c-9609-c39ac97fcfdf" alt="Game Mode 4" /></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/3db15478-8280-4ab3-bd89-07971c6614cd" alt="Game Mode 5" /></td>
    <td><img src="https://github.com/user-attachments/assets/8b14da0f-a22a-4fee-b666-b9a3cf851128" alt="Game Mode 6" /></td>
  </tr>
  <tr>
    <td colspan="2"><img src="https://github.com/user-attachments/assets/85f80f4a-1274-4492-b1a7-580383152132" alt="Game Summary" /></td>
  </tr>
</table>

---

## 🏆 Achievements & User Data

A snapshot of tracked user performance and progression.

<p align="center">
  <img src="https://github.com/user-attachments/assets/910bcb8b-20ac-45a5-95b2-d0997168a11f" alt="Achievements" />
</p>

---

## 🧭 Miscellaneous Screens

### ⚙️ Settings (Under Development)

<p align="center">
  <img src="https://github.com/user-attachments/assets/27a6078e-eae3-49d8-87af-68aea8859ef3" alt="Settings Page" />
</p>

### 🚀 Quick Navigation

<p align="center">
  <img src="https://github.com/user-attachments/assets/fd46164b-323d-43ee-b092-555ed18ed9a5" alt="Quick Nav" />
</p>

---

## 🏗️ Architecture & Technical Implementation

**Status:** ✅ Deployed & Active

### System Dependencies

1. **MongoDB Atlas**  
   Stores user progress and character → asset mappings

2. **Telegram Bot API**  
   Used as a CDN for audio pronunciations and stroke-order videos

3. **Telegram File IDs**  
   UI dynamically renders content using file IDs fetched from MongoDB

### Codebase Highlights

- `app/` — Next.js App Router structure
- `components/` — Tailwind CSS v4 driven responsive UI
- `lib/` — MongoDB connection logic and data-fetching layers

---

## 🛠️ Tech Stack

| Category  | Technology                   |
| --------- | ---------------------------- |
| Framework | Next.js 16.0.10 (App Router) |
| UI        | React 19.2.0                 |
| Styling   | Tailwind CSS v4              |
| Database  | MongoDB v7                   |
| Tooling   | ESLint                       |

---

## 📜 Development Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Run production build     |
| `npm run lint`  | Run ESLint               |

---

## 🔮 Roadmap

- [ ] Kanji support
- [ ] User authentication & progress persistence
- [ ] Global leaderboard

---

## 📄 License

**Proprietary**

Built for **learning, demonstration, and portfolio use**.
