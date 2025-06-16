import { useState } from 'react';

export default function ChatInput({ onSend }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <div className="d-flex gap-2 mt-2 w-100">
      <input
        type="text"
        className="form-control rounded-pill"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button className="btn btn-primary rounded-pill px-4" onClick={handleSend}>
        Send
      </button>
    </div>
  );
}