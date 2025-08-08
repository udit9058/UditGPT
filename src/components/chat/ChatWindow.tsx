import { useEffect, useRef } from "react";
import Message, { MessageProps } from "./Message";

interface ChatWindowProps {
  messages: MessageProps[];
}

const ChatWindow = ({ messages }: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto bg-chat-background">
      <div className="container mx-auto max-w-4xl px-4 py-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
              <img
                src="/src/assets/udit.png"
                alt="Udit"
                className="w-13 h-13 object-contain"
              />
            </div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Welcome to UditGPT
            </h2>
            <p className="text-muted-foreground max-w-md">
              Start a conversation by typing a message below. I'm here to help with any questions you might have!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <Message key={message.id} {...message} />
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;