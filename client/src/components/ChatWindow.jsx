import React from 'react';

export default function ChatWindow({ messages }) {
  return (
    <div
      className="border rounded bg-white p-3 mb-3 shadow-sm"
      style={{ height: '45vh', overflowY: 'auto' }}
    >
      {messages.map((msg, idx) => {
        const isUser = msg.type === 'user';
        return (
          <div
            key={idx}
            className={`d-flex mb-3 ${msg.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}
          >
            <div className="d-flex align-items-end">
              {!isUser && (
                <img
                  src="/bot.png"
                  alt="Bot"
                  className="me-2"
                  style={{ width: 28 }}
                />
              )}

              <div
                className={`p-2 rounded ${
                  isUser ? 'bg-primary text-white' : 'bg-light text-dark'
                }`}
                style={{
                  maxWidth: '70%',
                  wordBreak: 'break-word',
                  fontSize: '0.95rem',
                }}
              >
                {msg.text}
              </div>

              {isUser && (
                <img
                  src="/user.png"
                  alt="You"
                  className="ms-2"
                  style={{ width: 28 }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}