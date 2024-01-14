// context/ChatContext.js
import React, { createContext, useContext, useState } from "react";
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [accessedChat, setAccessedChat] = useState();
  const [isSearchContainerOpen, setIsSearchContainerOpen] = useState(false);
  const [chats, setChats] = useState([]);

  return (
    <ChatContext.Provider
      value={{
        accessedChat,
        setAccessedChat,
        chats,
        setChats,
        isSearchContainerOpen,
        setIsSearchContainerOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
