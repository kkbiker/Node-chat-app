'use client';

import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_NODE_API_URL);

type ChatContext = {
  message: string,
  setMessage: (value: string) => void,
  messages: Message[],
  setMessages: (value: Message[]) => void,
  handleSend: () => void
}

const ChatContext = createContext<ChatContext | null>(null);

type Message = {
  message: string
}

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSend = useCallback(() => {
    socket.emit("send-message", { message: message });
    setMessage("");
  }, [message]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/chat`);
        setMessages(res.data);
      } catch (err) {
        console.error("メッセージの取得に失敗しました。", err);
      }
    }

    getMessages();
  }, []);

  useEffect(() => {
    const listener = (data: { message: string }) => {
      setMessages((prev) => [...prev, data]);
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
