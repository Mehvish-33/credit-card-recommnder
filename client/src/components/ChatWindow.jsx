<<<<<<< HEAD
// File: /client/src/components/ChatWindow.jsx
import React from 'react';
import userImg from './User.png';
import botImg from './bot.png';
=======
import React from 'react';
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47

export default function ChatWindow({ messages }) {
  return (
    <div
      className="border rounded bg-white p-3 mb-3 shadow-sm"
<<<<<<< HEAD
      style={{ height: '45vh', overflowY: 'auto', background: '#f8f9fa', borderRadius: '1rem' }}
=======
      style={{ height: '45vh', overflowY: 'auto' }}
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
    >
      {messages.map((msg, idx) => {
        const isUser = msg.type === 'user';
        return (
          <div
            key={idx}
<<<<<<< HEAD
            className={`d-flex mb-3 ${isUser ? 'justify-content-end' : 'justify-content-start'}`}
=======
            className={`d-flex mb-3 ${msg.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
          >
            <div className="d-flex align-items-end">
              {!isUser && (
                <img
<<<<<<< HEAD
                  src={botImg}
                  alt="Bot"
                  className="me-2 rounded-circle shadow"
                  style={{ width: 30, height: 30 }}
=======
                  src="/bot.png"
                  alt="Bot"
                  className="me-2"
                  style={{ width: 28 }}
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
                />
              )}

              <div
<<<<<<< HEAD
                className={`p-3 rounded shadow-sm ${
=======
                className={`p-2 rounded ${
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
                  isUser ? 'bg-primary text-white' : 'bg-light text-dark'
                }`}
                style={{
                  maxWidth: '70%',
                  wordBreak: 'break-word',
                  fontSize: '0.95rem',
<<<<<<< HEAD
                  borderRadius: '1rem',
=======
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
                }}
              >
                {msg.text}
              </div>

              {isUser && (
                <img
<<<<<<< HEAD
                  src={userImg}
                  alt="You"
                  className="ms-2 rounded-circle shadow"
                  style={{ width: 30, height: 30 }}
=======
                  src="/user.png"
                  alt="You"
                  className="ms-2"
                  style={{ width: 28 }}
>>>>>>> 58c6a6f9741e896d2c7ea74b9fd400dbf706bf47
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}