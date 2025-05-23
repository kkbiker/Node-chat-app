import { useChatContext } from "../../../context/Chat/ChatContext";

export function Messages() {
  const { messages } = useChatContext();

  return (
    <div>
      {messages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
}
