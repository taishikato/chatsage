import { UIState } from "../lib/chat/actions";

export interface ChatList {
  messages: UIState;
}

export function ChatList({ messages }: ChatList) {
  if (!messages.length) {
    return null;
  }

  return (
    <div className="relative mx-auto px-6">
      {messages.map((message) => (
        <div key={message.id}>{message.display}</div>
      ))}
    </div>
  );
}
