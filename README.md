# Kana-Kochi

<img width="3840" height="2160" alt="Image" src="https://github.com/user-attachments/assets/01fd40f3-d8dc-466e-abcd-4e88d49393e7" />

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

<img width="3840" height="2160" alt="Image" src="https://github.com/user-attachments/assets/478d6e2b-f44b-4197-9ea0-39210ca18eb3" />
<img width="3840" height="6936" alt="Image" src="https://github.com/user-attachments/assets/c9646ad6-1dc8-4cb9-bfe6-596c3920bb0b" />

### 2. The Practice Layer: Stroke Mastery

Focuses on writing mechanics and muscle memory.

- **Visual Reference:** Video loops demonstrate the correct stroke order and direction.
- **Interactive Canvas:** A drawing area allows users to practice strokes immediately.
- **Input Support:** Optimized for Mouse, Touchpad, and Stylus/Pen devices.

<img width="3840" height="2328" alt="Image" src="https://github.com/user-attachments/assets/625bce3d-35b6-40c5-b979-07f55f8c8ae3" />
<img width="3840" height="6936" alt="Image" src="https://github.com/user-attachments/assets/26c522e5-79c4-43db-b7f1-36c9d5421977" />
<img width="3840" height="2160" alt="Image" src="https://github.com/user-attachments/assets/bd375da1-1ded-4898-9c87-c11ec2e924f3" />

### 3. The Gaming Layer: Gamified Reinforcement

A "Play-to-Learn" arena with difficulty scaling (Time Limits, Health/Lives).

**Mode A: Audio-to-Character Match**

- **Gameplay:** A sound is played, and the user must identify the correct character key from a list.
- **Mechanic:** Tests auditory recognition and speed.

**Mode B: Pick the Correct Word**

- **Gameplay:** Users hear a full Japanese word and must construct it by selecting characters in the correct order to fill empty boxes.
- **Mechanic:** Tests vocabulary and sequential character placement.

<img width="3840" height="2328" alt="Image" src="https://github.com/user-attachments/assets/e0fed41b-f616-43d3-9509-29476da676ec" />
<img width="3840" height="2328" alt="Image" src="https://github.com/user-attachments/assets/f1439252-0a97-416d-aba7-7a261d44680a" />
<img width="3840" height="2328" alt="Image" src="https://github.com/user-attachments/assets/cf856f07-9332-45a0-bdfd-115b249013f2" />
<img width="3840" height="2160" alt="Image" src="https://github.com/user-attachments/assets/5f88acd8-ed27-4e6c-9609-c39ac97fcfdf" />
<img width="3840" height="2160" alt="Image" src="https://github.com/user-attachments/assets/3db15478-8280-4ab3-bd89-07971c6614cd" />
<img width="3840" height="2160" alt="Image" src="https://github.com/user-attachments/assets/8b14da0f-a22a-4fee-b666-b9a3cf851128" />
<img width="3840" height="2160" alt="Image" src="https://github.com/user-attachments/assets/85f80f4a-1274-4492-b1a7-580383152132" />
<img width="3840" height="2160" alt="Image" src="https://github.com/user-attachments/assets/a05ee8b7-defc-4360-9997-5d077c844b00" />
---


### 4. The Achievements: A Brief look at User Data

<img width="3840" height="2328" alt="Image" src="https://github.com/user-attachments/assets/910bcb8b-20ac-45a5-95b2-d0997168a11f" />


### 5. Miscellenious Screens:

Under Development Settings Page
<img width="1919" height="839" alt="image" src="https://github.com/user-attachments/assets/27a6078e-eae3-49d8-87af-68aea8859ef3" />


Quick Nav for fast Navigation from anywhere
<img width="706" height="637" alt="Image" src="https://github.com/user-attachments/assets/fd46164b-323d-43ee-b092-555ed18ed9a5" />

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
