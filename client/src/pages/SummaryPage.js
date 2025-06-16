// File: /client/src/pages/SummaryPage.jsx
import { useChat } from '../context/ChatContext';
import { getRecommendations } from '../services/api';
import { useEffect, useState } from 'react';
import RecommendationCard from '../components/RecommendationCard';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SummaryPage() {
  const { sessionId } = useChat();
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) return;
    getRecommendations(sessionId).then(setCards);
  }, [sessionId]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <section
        className="py-5 text-center text-white animate__animated animate__fadeIn"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.1)',
          borderBottomLeftRadius: '60px',
          borderBottomRightRadius: '60px'
        }}
      >
        <div className="container">
          <h2 className="display-4 fw-bold mb-3 animate__animated animate__fadeInDown">
            🌟 Personalized Credit Card Picks Just for You
          </h2>
          <p className="lead animate__animated animate__fadeInUp">
            Our AI has curated a list of cards that match your profile perfectly.
          </p>
        </div>
      </section>

      <main className="container my-5 animate__animated animate__fadeInUp" style={{ maxWidth: '980px' }}>
        {cards.map((card, idx) => (
          <div className="animate__animated animate__fadeInUp" style={{ animationDelay: `${idx * 0.2}s`, animationFillMode: 'both' }} key={idx}>
            <RecommendationCard card={card} />
          </div>
        ))}

        <div className="text-center mt-5">
          <button
            className="btn btn-outline-danger btn-lg px-4 rounded-pill shadow-lg mx-2"
            onClick={() => navigate('/')}
          >
            🔄 Restart
          </button>

          <button
            className="btn btn-success btn-lg px-4 rounded-pill shadow-lg mx-2"
            disabled
          >
            🔍 Compare Cards (Coming Soon)
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
