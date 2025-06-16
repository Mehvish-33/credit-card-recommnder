// File: /client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import SummaryPage from './pages/SummaryPage';
import { ChatProvider } from './context/ChatContext';

export default function App() {
  return (
    <ChatProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </Router>
    </ChatProvider>
  );
}