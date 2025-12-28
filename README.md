# Kana-Kochi

<img width="1905" height="832" alt="Image" src="https://github.com/user-attachments/assets/3046d738-8661-4908-8d09-7d2f19a95784" />

**Master Japanese Hiragana and Katakana through Learning, Practice, and Play.**

[**View Live Demo**](https://kana-kochi.vercel.app)

---

> ⚠️ **Note to Visitors:** This repository is for **showcase and code inspection purposes only**.
>
> The application logic relies on private Telegram API keys for asset hosting and a proprietary MongoDB dataset containing specific character-to-file-ID mappings. As these credentials and data are not public, this project is **not intended to be run locally**.

---

## 📖 Overview

**Kana-Kochi** is a comprehensive language learning application built with **Next.js 16**. It is designed to help beginners master the Japanese writing systems (Kana) through a structured three-layer approach: **Learn, Practice, and Play**.

Unlike standard flashcard apps, Kana-Kochi emphasizes muscle memory through stroke practice and reinforces learning through gamified challenges with dynamic difficulty scaling.

---

## ✨ Key Features

The application is divided into three distinct layers to guide the user from recognition to mastery.

### 1. The Learning Layer: Interactive Charts

A foundational module for visual and auditory memorization.

- **Complete Syllabary:** Full charts for both **Hiragana** and **Katakana**.
- **Audio Integration:** Hover or click on any character to hear its accurate pronunciation.
- **Goal:** Establish character recognition before attempting to write.

<img width="1919" height="863" alt="Image" src="https://github.com/user-attachments/assets/37c8beef-e985-4c1c-84e6-2feabac66d48" />
<img width="1919" height="902" alt="Image" src="https://github.com/user-attachments/assets/80fa4958-9e6b-44aa-8115-d87c4f5e1695" />

### 2. The Practice Layer: Stroke Mastery

Focuses on writing mechanics and muscle memory.

- **Visual Reference:** Video loops demonstrate the correct stroke order and direction.
- **Interactive Canvas:** A drawing area allows users to practice strokes immediately.
- **Input Support:** Optimized for Mouse, Touchpad, and Stylus/Pen devices.

<img width="1919" height="906" alt="Image" src="https://github.com/user-attachments/assets/f4ac2220-db25-40ef-ac5b-5cd64d851c00" />
<img width="1919" height="909" alt="Image" src="https://github.com/user-attachments/assets/9784c631-ed70-4637-91ee-05c8bd7e31f5" />

### 3. The Gaming Layer: Gamified Reinforcement

A "Play-to-Learn" arena with difficulty scaling (Time Limits, Health/Lives).

**Mode A: Audio-to-Character Match**

- **Gameplay:** A sound is played, and the user must identify the correct character key from a list.
- **Mechanic:** Tests auditory recognition and speed.

**Mode B: Pick the Correct Word**

- **Gameplay:** Users hear a full Japanese word and must construct it by selecting characters in the correct order to fill empty boxes.
- **Mechanic:** Tests vocabulary and sequential character placement.

<img width="1919" height="881" alt="Image" src="https://github.com/user-attachments/assets/bdd7198b-361d-4118-9fc7-088d447f2346" />
<img width="1919" height="893" alt="Image" src="https://github.com/user-attachments/assets/51037b06-d963-4bf6-ab1e-27fa6ad3fddd" />
---

## 🏗️ Architecture & Technical Implementation

**Current Status:** Deployed & Active

While this project cannot be run locally without the private environment keys, the codebase follows a standard **Next.js 16** structure combined with **MongoDB** patterns.

### System Dependencies

The application logic is tightly coupled with the following external services:

1.  **MongoDB Atlas:** Stores user progress and intricate mappings between Japanese characters and asset IDs.
2.  **Telegram Bot API:** Acts as the Content Delivery Network (CDN) for hosting audio pronunciations and stroke order videos.
3.  **Telegram File IDs:** The UI renders assets dynamically by fetching File IDs stored in the DB; without the specific DB seed data, the UI will not render content.

### Codebase Highlights

If you are reviewing the code, I recommend looking at:

- `app/` directory for the **Next.js App Router** implementation.
- `components/` to see how **Tailwind CSS v4** is utilized for the responsive game UI.
- `lib/` (or equivalent) to review the **MongoDB** connection logic and data fetching strategies.

---

## 🛠️ Tech Stack

This project utilizes the latest features of the React ecosystem.

- **Framework:** [Next.js 16.0.10](https://nextjs.org/) (App Router)
- **UI Library:** [React 19.2.0](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database:** [MongoDB v7.0.0](https://www.mongodb.com/)
- **Linter:** ESLint

---

## 📜 Development Scripts

_For reference, these are the scripts defined in `package.json` used during the development of this application:_

| Script          | Description                                       |
| :-------------- | :------------------------------------------------ |
| `npm run dev`   | Starts the Next.js development server.            |
| `npm run build` | Builds the application for production deployment. |
| `npm run start` | Runs the built production application.            |
| `npm run lint`  | Runs ESLint for code quality checks.              |

---

## 🔮 Roadmap

- [ ] Add Kanji support.
- [ ] User authentication to save progress/high scores.
- [ ] Leaderboard

---

## 📄 License

Proprietary
