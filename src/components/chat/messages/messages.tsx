import { useChatContext } from "../../../context/Chat/ChatContext";
import styles from "./messages.module.css";

export function Messages() {
  const { messages } = useChatContext();

  return (
    <div className={styles.container}>
      {messages.map((message, index) => (
        <p key={index}>{message.message}</p>
      ))}
    </div>
  );
}
