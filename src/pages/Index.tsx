import { useState, useEffect } from "react";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/chat/ChatInput";
import { useTheme } from "@/hooks/useTheme";
import { MessageProps } from "@/components/chat/Message";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const Index = () => {
  const { isDark, toggleTheme } = useTheme();
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      id: "1",
      content: "Hello! I'm UditGPT, your AI assistant. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const generateUniqueId = () => Date.now().toString();

  const handleSendMessage = async (content: string) => {
    const userMessage: MessageProps = {
      id: generateUniqueId(),
      content,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    console.log("User message added to state:", userMessage);
    setIsLoading(true);

    try {
      const token = process.env.REACT_APP_GITHUB_TOKEN;
      const endpoint = "https://models.github.ai/inference";
      const model = "openai/gpt-4.1";

      console.log("Initializing client with token and endpoint");
      if (!token) {
        throw new Error(
          "GitHub token is not loaded from environment variables. Check your .env file or Netlify dashboard."
        );
      }

      const client = ModelClient(endpoint, new AzureKeyCredential(token));

      console.log("Attempting API call with message:", content);
      const response = await client.path("/chat/completions").post({
        body: {
          messages: [
            { role: "system", content: "You are a helpful AI assistant." },
            { role: "user", content },
          ],
          temperature: 0.7, // Adjusted for balanced responses
          top_p: 0.9, // Adjusted for variety
          model,
        },
      });

      if (isUnexpected(response)) {
        throw response.body.error || new Error("Unexpected response from API");
      }

      console.log("API Response received:", response.body);
      const botMessage: MessageProps = {
        id: generateUniqueId(),
        content: response.body.choices[0].message.content,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      console.log("Bot message added to state:", botMessage);
    } catch (error) {
      console.error("API Error caught:", {
        message: error.message,
        response: (error as any).response?.body,
        status: (error as any).response?.status,
        stack: error.stack,
      });
      const errorMessage: MessageProps = {
        id: generateUniqueId(),
        content: `Error: ${error.message}. Please check your token or try again later.`,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.log("Error message added to state:", errorMessage);
    } finally {
      setIsLoading(false);
      console.log("isLoading set to false");
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <ChatHeader isDark={isDark} toggleTheme={toggleTheme} />
      <ChatWindow messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default Index;