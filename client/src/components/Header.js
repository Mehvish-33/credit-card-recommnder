// File: /client/src/components/Header.jsx
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('/');
  const [isShrunk, setIsShrunk] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsShrunk(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinkStyle = (path) => ({
    fontWeight: '600',
    padding: '10px 20px',
    borderRadius: '50px',
    textAlign: 'center',
    color: activeTab === path ? '#000' : '#fff',
    backgroundColor: activeTab === path ? '#fff' : 'transparent',
    boxShadow: activeTab === path ? '0 2px 8px rgba(0,0,0,0.15)' : 'none',
<<<<<<< HEAD
    transition: 'all 0.3s ease-in-out',
    textDecoration: 'none',
=======
    transition: 'all 0.3s ease-in-out'
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
  });

  return (
    <header
      className={`sticky-top ${isShrunk ? 'py-2' : 'py-4'}`}
      style={{
        backgroundColor: '#6D28D9',
        backgroundImage: 'linear-gradient(135deg, #6D28D9, #8B5CF6)',
        backgroundAttachment: 'fixed',
        color: 'white',
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
        borderBottomLeftRadius: '1.5rem',
        borderBottomRightRadius: '1.5rem',
        zIndex: 1000,
        transform: 'translateZ(0)',
<<<<<<< HEAD
        backfaceVisibility: 'hidden',
=======
        backfaceVisibility: 'hidden'
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
      }}
    >
      <div className="container d-flex justify-content-between align-items-center px-3 flex-wrap">
        <Link
          to="/"
          className="text-white fw-bold text-decoration-none animate__animated animate__pulse animate__infinite"
          style={{ fontWeight: 700, fontSize: isShrunk ? '1.3rem' : '1.6rem', transition: 'font-size 0.3s ease' }}
        >
          💳 CardMate
        </Link>

        <div className="d-flex align-items-center">
          <button
            className="btn d-lg-none text-white fs-4"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>

        <div
          className={`mobile-nav bg-dark text-white position-fixed top-0 end-0 h-100 p-4 transition-all ${
            menuOpen ? 'd-block' : 'd-none'
          } d-lg-none`}
          style={{
            width: '250px',
            zIndex: 1100,
            background: 'rgba(30, 41, 59, 0.95)',
<<<<<<< HEAD
            backdropFilter: 'blur(10px)',
=======
            backdropFilter: 'blur(10px)'
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
          }}
        >
          <button className="btn-close btn-close-white mb-4" onClick={() => setMenuOpen(false)}></button>
          <nav className="d-flex flex-column gap-3">
<<<<<<< HEAD
            <Link to="/" onClick={() => setMenuOpen(false)} style={navLinkStyle('/')}>💬 Chat</Link>
            <Link to="/summary" onClick={() => setMenuOpen(false)} style={navLinkStyle('/summary')}>🎯 Recommendations</Link>
=======
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              style={navLinkStyle('/')}
            >
              💬 Chat
            </Link>
            <Link
              to="/summary"
              onClick={() => setMenuOpen(false)}
              style={navLinkStyle('/summary')}
            >
              🎯 Recommendations
            </Link>
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
          </nav>
        </div>

        <nav className="d-none d-lg-flex gap-3 align-items-center">
          <Link to="/" style={navLinkStyle('/')}>💬 Chat</Link>
          <Link to="/summary" style={navLinkStyle('/summary')}>🎯 Recommendations</Link>
        </nav>
      </div>
    </header>
  );
}
