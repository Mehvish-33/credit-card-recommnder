# 💳 CardMate: Your AI-Powered Credit Card Companion

Welcome to **CardMate**, a smart, conversational assistant that helps users discover the most suitable Indian credit cards based on their income, lifestyle, and preferences — all through a dynamic chat interface backed by OpenAI's GPT.

---

## 🚀 Live Demo

🌐 **Frontend:** [https://your-deployed-url.netlify.app](https://your-deployed-url.netlify.app)
🎥 **Demo Video:** *\[Insert Loom/YT link here]*

---

## 🧠 Overview

CardMate intelligently blends large language models with structured financial logic to deliver meaningful, tailored recommendations.

### 🔗 Tech Stack

* **Frontend:** ReactJS with Bootstrap for styling, animations, and mobile responsiveness
* **Backend:** Node.js + Express for routing and LLM orchestration
* **Databases:**

  * **SQLite** → Static credit card data (20+ cards)
  * **MongoDB** → User sessions and extracted preferences
* **LLM API:** OpenAI GPT-4o with tool usage

---

## 🧩 Agent Flow Explained

The intelligence of CardMate lies in its guided conversation flow that mimics human dialogue and adapts in real-time:

```mermaid
graph TD;
    A[User says: "Help me choose a credit card"] --> B[LLM prompts for income, credit score, benefits];
    B --> C[User answers naturally];
    C --> D[LLM uses extract_user_info tool];
    D --> E[System detects: conversationComplete = true];
    E --> F[Recommendation engine ranks and scores cards];
    F --> G[User receives top 3 recommendations]
```

### 🛠️ Tool Design: `extract_user_info`

The OpenAI assistant extracts structured details using tool calls:

```json
{
  "monthlyIncome": 50000,
  "creditScore": 740,
  "preferredBenefits": ["travel", "fuel"],
  "spendingHabits": {
    "fuel": 3000,
    "shopping": 7000
  }
}
```

The backend checks completeness of inputs and triggers the recommendation module once all fields are captured.

---

## ✨ Features At a Glance

* 💬 Conversational, natural-language input
* 🔍 Smart user data extraction with tool calling
* 📈 Credit card scoring logic with justification
* 📊 Summary screen with visual cards
* 🔁 Option to restart or compare cards
* 📱 Fully mobile responsive UI
* 🎨 Glassmorphism, gradients, and smooth transitions

---

## 🧬 Project Structure

```bash
credit-card-advisor/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/   # Header, ChatWindow, RecommendationCard
│   │   ├── pages/        # ChatPage, SummaryPage
│   │   └── services/     # new.js (API logic)
├── server/               # Node.js backend
│   ├── controllers/      # chatController.js, recommendationController.js
│   ├── services/         # llmService.js, creditCardService.js
│   └── data/             # indian_credit_cards.sql, setup script
└── README.md
```

---

## ⚙️ Setup Guide

### 1️⃣ Backend (Node.js + Express)

```bash
cd server
npm install
cp .env.example .env   # Fill in OpenAI key and Mongo URI
node scripts/setup_sqlite_db.js   # Create SQLite DB
npm start
```

### 2️⃣ Frontend (React)

```bash
cd client
npm install
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in the `server/` directory:

```env
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/cardmate
PORT=5000
```

---

## 🌐 Deploying the App

You can deploy the **frontend** on **Netlify** easily:

1. Push the `client/` folder to GitHub
2. Visit [https://netlify.com](https://netlify.com) → New site from Git
3. Set:

   * Build command: `npm run build`
   * Publish directory: `build/`

☑️ **Note**: Host the backend separately (Render, Railway, or locally for testing).

---

## ✅ Submission Checklist

* [x] 🔧 Fully working agent flow with prompt + tool logic
* [x] 🧠 OpenAI LLM with real-time data extraction
* [x] 💬 Beautiful frontend (chat + summary)
* [x] 🗃️ Dual-database setup (Mongo + SQLite)
* [x] 🌐 Live frontend link
* [ ] 🎥 Demo video included in README

---

## 👨‍💻 Credits

Crafted by \[Your Name] for the **AI/ML Internship Final Project - Summer 2025**
*“Where intelligent interfaces meet financial clarity.”*

---

Need help running the project or contributing? Open an issue or start a discussion!
