import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import ChatInput from './ChatInput';
import ModelClient, { isUnexpected } from '@azure-rest/ai-inference';
import { AzureKeyCredential } from '@azure/core-auth';

// Match MessageProps from Message.tsx
interface MessageProps {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatPage = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const generateUniqueId = () => Date.now().toString();

  const handleSendMessage = async (message: string) => {
    console.log('handleSendMessage called with message:', message);
    const userMessage: MessageProps = {
      id: generateUniqueId(),
      content: message,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    console.log('User message added to state:', userMessage);
    setIsLoading(true);

    try {
      const token = ""; // Use environment variable for token
      const endpoint = 'https://models.github.ai/inference';
      const model = 'openai/gpt-4.1';

      console.log('Initializing client with token and endpoint');
      if (!token) {
        throw new Error('GitHub token is not loaded from environment variables. Check your .env file.');
      }

      const client = ModelClient(endpoint, new AzureKeyCredential(token));

      console.log('Attempting API call with message:', message);
      const response = await client.path('/chat/completions').post({
        body: {
          messages: [
            { role: 'system', content: '' },
            { role: 'user', content: message },
          ],
          temperature: 1,
          top_p: 1,
          model: model,
        },
      });

      if (isUnexpected(response)) {
        throw response.body.error || new Error('Unexpected response from API');
      }

      console.log('API Response received:', response.body);
      const botMessage: MessageProps = {
        id: generateUniqueId(),
        content: response.body.choices[0].message.content,
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      console.log('Bot message added to state:', botMessage);
    } catch (error) {
      console.error('API Error caught:', {
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
      console.log('Error message added to state:', errorMessage);
    } finally {
      setIsLoading(false);
      console.log('isLoading set to false');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <ChatWindow messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default ChatPage;