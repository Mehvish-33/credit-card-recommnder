// File: /client/src/context/ChatContext.jsx
import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [userInputs, setUserInputs] = useState({});
  const [conversationComplete, setConversationComplete] = useState(false);

  return (
    <ChatContext.Provider value={{
      messages, setMessages,
      sessionId, setSessionId,
      userInputs, setUserInputs,
      conversationComplete, setConversationComplete
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
