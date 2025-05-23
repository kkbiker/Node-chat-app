'use client';

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(`${process.env.NEXT_PUBLIC_NODE_API_URL}`);

type ChatContext = {
  message: string,
  setMessage: (value: string) => void,
  messages: string[],
  setMessages: (value: string[]) => void,
  handleSend: () => void
}

const ChatContext = createContext<ChatContext | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  const handleSend = useCallback(() => {
    socket.emit("send-message", { message: message });
    setMessage("");
  }, [message]);

  useEffect(() => {
    const listener = (data: {message: string}) => {
      setMessages((prev) => [...prev, data.message]);
    }

    socket.on("receive-message", listener);

    return () => {
      socket.off("receive-message", listener);
    };
  }, []);

  return (
    <ChatContext.Provider value={{
      message,
      setMessage,
      messages,
      setMessages,
      handleSend
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("not found context");
  return context;
}
