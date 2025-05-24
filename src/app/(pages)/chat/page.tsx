"use client";

import { ChatProvider } from "@/context/Chat/ChatContext";
import { SendInput } from "@/component/chat/send_input/send_input";
import { Messages } from "@/component/chat/messages/messages";

import styles from "./chat.module.css";

export default function Chat() {
  return (
    <main className={styles.container}>
      <ChatProvider>
        <section className={styles.chatArea}>
          <Messages />
          <SendInput />
        </section>
      </ChatProvider>
    </main>
  );
}
