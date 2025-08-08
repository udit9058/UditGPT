import { useState } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";
import { useTheme } from "@/hooks/useTheme";
import { MessageProps } from "@/components/chat/Message";

const Index = () => {
  const { isDark, toggleTheme } = useTheme();
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      id: "1",
      content: "Hello! I'm UditGPT, your AI assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  const handleSendMessage = (content: string) => {
    const userMessage: MessageProps = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: MessageProps = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your message! This is a demo response. In a real implementation, this would be connected to an AI service.",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <ChatHeader isDark={isDark} toggleTheme={toggleTheme} />
      <ChatWindow messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Index;
