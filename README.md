# 💳 Credit Card Advisor – AI-Powered Recommendation System

> **A smart, humanized, AI-driven assistant that recommends credit cards based on user lifestyle, income, and preferences, with real-time chat, scoring engine, database integration, and WhatsApp support.**

---

## 📽️ Demo

[https://your-deployment-link.com  ](https://credit-card-ui.onrender.com)
🎥 *Watch the full working screen recording in the repo or GitHub README preview*

---

## 📌 Project Overview

The Credit Card Advisor is a full-stack intelligent recommendation platform that simulates a chatbot-based experience. Users are guided through a smooth conversational flow powered by LLMs and tools to extract key financial traits and preferences. The backend matches this against a curated card database and ranks results using a custom scoring algorithm.

The system is designed to feel human, smart, and visually polished — with a smooth chat interface, structured recommendation cards, PDF report, and WhatsApp delivery.

---

## 🎯 Key Features

| Category                     | Features                                                                                                                                  |
|-----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| 💬 Conversational UI        | Chatbot collects user inputs, confirms info, handles follow-ups intuitively                                                              |
| 📊 Dual Database Model      | - SQLite for static card data <br> - MongoDB for dynamic session/user inputs                                                             |
| 🧠 AI-Powered Intelligence   | - LangChain for tool calling <br> - OpenAI GPT-4o for prompt logic <br> - Agent-based architecture                                       |
| 🧮 Custom Logic              | - Rule-based filtering <br> - Weighted scoring of cards <br> - JSON info extraction                                                      |
| 📋 Summary & Export         | - Final recommendations shown visually <br> - Summary export as PDF using `reportlab`                                                    |
| 💬 WhatsApp Integration     | - Twilio API used to send recommendations directly to user’s WhatsApp                                                                    |
| 🔐 Secure & Modular Backend | - FastAPI-compatible JWT auth ready <br> - Modular routes and service design                                                             |
| 💅 Frontend Polish          | - React UI with Bootstrap, animation, icons <br> - Fully responsive design, chatbot avatars, smooth transitions                          |

---

## 🏗️ Architecture

```
             ┌────────────┐
             │   Frontend │  ← React (Chat UI, Summary Page)
             └─────┬──────┘
                   │ REST API Calls
                   ▼
           ┌───────────────┐
           │    Backend    │  ← Node.js + Express
           ├───────────────┤
           │ LangChain     │  ← LLM toolchain, prompt logic
           │ DB Handler    │  ← Mongo (sessions) + SQLite (cards)
           │ WhatsApp API  │  ← Twilio Messaging
           └──────┬────────┘
                  │
         ┌────────▼────────┐
         │  SQLite + Mongo │  ← Dual DB Storage
         └─────────────────┘
```

---

## 🧠 Agent Flow & Prompt Design

The LLM agent uses structured prompting with tool invocation. Prompting logic ensures users are never overwhelmed.

### Flow:
1. Start chat – Welcome message
2. Collect inputs – Monthly income, spending habits, card preferences
3. LangChain Tool – Calls `extract_user_info` to parse details
4. SQLite Match – Filters cards based on eligibility
5. Scoring Logic – Rewards, annual fee, match percentage
6. GPT Output – Final message + justifications
7. PDF & WhatsApp – Summary exported and sent if opted

---

## 🧾 PDF Report Sample

| 📌 Section         | 📄 Included in PDF Report |
|--------------------|---------------------------|
| User Info          | Monthly Income, Credit Score, Preferences |
| Card Summary       | Top 3 matched cards with reward estimate |
| Scoring Justification | Why each card suits the user best |
| Timestamp + Branding | For audit/reference purposes |

---

## 📱 WhatsApp Messaging

Using Twilio API, users receive their top card suggestions directly to WhatsApp:

```js
{
  name: "SBI Elite Card",
  reason: "Matches your high travel spend & lounge preference",
  link: "https://apply.sbi.com/elite"
}
```

---

## 🧾 Tech Stack

| Layer        | Tech Used                                      |
|--------------|-------------------------------------------------|
| Frontend     | React, Bootstrap, Animate.css, Icons            |
| Backend      | Node.js, Express.js                             |
| AI Layer     | OpenAI GPT-4o, LangChain, JSON Tools            |
| DB Layer     | SQLite (credit card data), MongoDB (sessions)   |
| Messaging    | Twilio (WhatsApp API)                           |
| Auth Layer   | JWT (Firebase-ready)                            |
| Export       | `reportlab` for PDF generation                  |

---

## 📂 Folder Structure

```
credit_card_rcmmnd/
├── client/                # React frontend
│   └── src/components/    # ChatWindow, Header, RecommendationCard
├── server/                # Express backend
│   ├── config/            # DB config files
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API routes for chat, WhatsApp
│   ├── services/          # LLM, WhatsApp, recommendation logic
│   └── server.js          # Entry point
├── credit_cards.db        # SQLite DB file
└── README.md              # You're reading it!
```

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
git clone https://github.com/Mehvish-33/credit-card-recommnder.git
cd credit-card-recommnder
cd server && npm install
cd ../client && npm install
```

### 2. Configure Environment

Create a `.env` file inside `/server`:

```env
OPENAI_API_KEY=your-openai-key
MONGO_URI=mongodb+srv://...
JWT_SECRET=myjwtsecret
SQLITE_DB_PATH=./server/data/credit_cards.db
PINECONE_DB_KEY=your-pinecone-key
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_FROM=+1xxx
```

Client `.env`:

```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

### 3. Run the Project

```bash
# Terminal 1
cd server
node server.js

# Terminal 2
cd client
npm start
```

---

## ✅ Evaluation Checklist

| Requirement                             | Status |
|-----------------------------------------|--------|
| ✅ LLM Agent Workflow                    | ✅      |
| ✅ Prompt Design & JSON Extraction       | ✅      |
| ✅ SQLite + MongoDB Integration          | ✅      |
| ✅ Chat UI with Recommendation Cards     | ✅      |
| ✅ PDF Export Functionality              | ✅      |
| ✅ WhatsApp Output via Twilio            | ✅      |
| ✅ Professional README + Demo            | ✅      |

---

## 🧠 Learnings & Innovations

- How to structure LLM prompts for real-world data collection
- Hybrid logic: rule-based + AI
- Integrating multi-database architectures
- Prompt engineering with LangChain
- Making AI outputs feel human and business-ready

---

## 👨‍💻 Author

**Mehvish Idris**  
GitHub: [@Mehvish-33](https://github.com/Mehvish-33)

---

## 📜 License

MIT License © 2025 – Mehvish Idris
