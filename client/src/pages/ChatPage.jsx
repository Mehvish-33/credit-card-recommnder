import { useChat } from '../context/ChatContext';
import ChatWindow from '../components/ChatWindow';
import ChatInput from '../components/ChatInput';
import { sendMessageToBot } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ChatPage() {
  const {
    messages, setMessages, sessionId, setSessionId,
    setUserInputs, setConversationComplete
  } = useChat();

  const navigate = useNavigate();

  const handleSend = async (input) => {
    setMessages(prev => [...prev, { type: 'user', text: input }]);

    const res = await sendMessageToBot(sessionId, input);
    setSessionId(res.sessionId);
    setUserInputs(res.userInputs || {});
    setConversationComplete(res.conversationComplete || false);
    setMessages(prev => [...prev, { type: 'bot', text: res.response}]);

    if (res.conversationComplete) {
      setTimeout(() => navigate('/summary'), 1500);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <section className="py-5 text-center bg-light">
        <div className="container">
          <h1 className="display-5 fw-bold text-primary mb-3">Credit Card Recommendation Assistant</h1>
          <p className="lead text-muted mb-4">
            Discover the best credit cards tailored to your lifestyle and spending habits.
          </p>

          <div className="bg-white p-4 rounded shadow-lg mx-auto" style={{ maxWidth: '768px' }}>
            <h4 className="mb-3 fw-semibold">Find Your Perfect Credit Card</h4>
            <p className="text-muted mb-4" style={{ fontSize: '0.95rem' }}>
              Start chatting and we'll collect your preferences step by step.
            </p>

            <ChatWindow messages={messages} />
            <ChatInput onSend={handleSend} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}