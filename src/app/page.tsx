'use client';

import { SendInput } from "@/component/chat/send_input/send_input";
import { Messages } from "@/component/chat/messages/messages";
import { ChatProvider } from "../context/Chat/ChatContext";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <ChatProvider>
        <SendInput />
        <Messages />
      </ChatProvider>
    </main>
  );
}
