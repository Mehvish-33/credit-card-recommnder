// File: /client/src/components/ChatWindow.jsx
import React from 'react';
import userImg from './User.png';
import botImg from './bot.png';

export default function ChatWindow({ messages }) {
  return (
    <div
      className="border rounded bg-white p-3 mb-3 shadow-sm"
      style={{
        height: '45vh',
        overflowY: 'auto',
        background: '#f8f9fa',
        borderRadius: '1rem'
      }}
    >
      {messages.map((msg, idx) => {
        const isUser = msg.type === 'user';
        return (
          <div
            key={idx}
            className={`d-flex mb-3 ${isUser ? 'justify-content-end' : 'justify-content-start'}`}
          >
            <div className="d-flex align-items-end">
              {!isUser && (
                <img
                  src={botImg}
                  alt="Bot"
                  className="me-2 rounded-circle shadow"
                  style={{ width: 30, height: 30 }}
                />
              )}

              <div
                className={`p-3 rounded shadow-sm ${
                  isUser ? 'bg-primary text-white' : 'bg-light text-dark'
                }`}
                style={{
                  maxWidth: '70%',
                  wordBreak: 'break-word',
                  fontSize: '0.95rem',
                  borderRadius: '1rem'
                }}
              >
                {msg.text}
              </div>

              {isUser && (
                <img
                  src={userImg}
                  alt="You"
                  className="ms-2 rounded-circle shadow"
                  style={{ width: 30, height: 30 }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
