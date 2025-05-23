import { useChatContext } from "../../../context/Chat/ChatContext";
import styles from "./send_input.module.css";

export function SendInput() {
  const { message, setMessage, handleSend } = useChatContext();

  return (
    <div className={styles.container}>
      <input type="text" value={message ?? ""} onChange={(e) => setMessage(e.target.value)} />
      <button type="button" onClick={() => handleSend()}>送信</button>
    </div>
  );
}
