# 💳 Credit Card Recommender (AI-Powered Chat Advisor)

An intelligent full-stack web application that helps users find the most suitable credit card based on their income, preferences, and lifestyle — through a dynamic, conversational interface powered by GPT-4 and LangChain.

---

## 🌐 Live Demo

- 🧠 Frontend (React): [https://credit-card-ui.onrender.com](https://credit-card-ui.onrender.com)
- ⚙️ Backend (Node.js + Express): [https://credit-card-recommnder.onrender.com](https://credit-card-recommnder.onrender.com)

---

## 🧠 Tech Stack

| Layer        | Technologies Used                                                                 |
|--------------|-------------------------------------------------------------------------------------|
| **Frontend** | React, Bootstrap 5, Context API, Animated CSS                                      |
| **Backend**  | Node.js, Express.js, LangChain, OpenAI (GPT-4o), Pinecone, SQLite, MongoDB         |
| **Databases**| SQLite (static credit card data), MongoDB Atlas (session/user state)              |
| **AI Logic** | LangChain agent with OpenAI tool calling, profile extraction, and recommendations  |
| **Hosting**  | Render (frontend + backend)                                                        |

---

## ✨ Features

- 💬 Conversational chat UI powered by GPT-4
- 🧠 LLM uses tool-calling to extract structured user inputs
- 🗃 SQLite used to store 20+ Indian credit cards and benefits
- 🧾 Personalized card recommendations based on profile scoring
- 🌐 Fully deployed frontend + backend (Render)
- 🎯 Optional: Compare cards, generate PDF summaries, voice input/output

---

## 🧩 How the Application Works: Step-by-Step Flow

### 🏗 Initial Setup
- SQLite is initialized via `/server/scripts/setup_sqlite_db.js` from `indian_credit_cards.sql`
- MongoDB session storage is ready via Mongoose (`UserSession` model)
- `.env` contains API keys and DB URIs

### 🟢 Phase 1: Chat Starts
- React frontend sends user messages via `sendMessageToBot()` (Axios)
- Backend handles `/api/chat` via `chatController.js`
- Session is fetched or created using UUID in `userSessionService.js`
- LLM context and tools (`extract_user_info`) are passed to GPT-4o via LangChain

### 🔁 Phase 2: LLM-Guided Profile Collection
- LLM asks for income, spending, needs
- Once it collects everything (via tool call), it sets `conversationComplete=true`
- User inputs are saved into MongoDB, chat history updated

### 🧠 Phase 3: Recommendations Generated
- Frontend hits `/api/recommendations?sessionId=...`
- Backend fetches inputs from MongoDB
- All cards are pulled from SQLite
- `recommendationEngine.js` filters + scores cards using business rules
- Top 3–5 cards are returned with benefits + reward simulations

### 🎯 Phase 4: Summary & Restart
- Recommendations rendered in `SummaryPage.jsx`
- User can view cards, restart the flow, or (optionally) export a PDF

---

## 🛠️ Local Development

```bash
# Clone the repo
git clone https://github.com/Mehvish-33/credit-card-recommnder.git
cd credit-card-recommnder

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Start servers
cd ../server
node server.js

cd ../client
npm start
