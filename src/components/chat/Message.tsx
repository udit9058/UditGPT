import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MessageProps {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const Message = ({ content, isBot, timestamp }: MessageProps) => {
  return (
    <div className={cn(
      "flex w-full animate-message-in",
      isBot ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "flex max-w-[85%] sm:max-w-[70%] space-x-3",
        isBot ? "flex-row" : "flex-row-reverse space-x-reverse"
      )}>
        {/* Avatar */}
        <div className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          isBot 
            ? "bg-bot-message border border-chat-border" 
            : "bg-user-message"
        )}>
          {isBot ? (
            <Bot className="h-5 w-5 text-bot-message-foreground" />
          ) : (
            <User className="h-5 w-5 text-user-message-foreground" />
          )}
        </div>
        
        {/* Message bubble */}
        <div className={cn(
          "rounded-2xl px-4 py-3 shadow-sm border transition-all duration-200",
          isBot
            ? "bg-bot-message text-bot-message-foreground border-chat-border hover:shadow-md"
            : "bg-user-message text-user-message-foreground border-user-message"
        )}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {content}
          </p>
          <time className={cn(
            "mt-1 block text-xs opacity-70",
            isBot ? "text-bot-message-foreground" : "text-user-message-foreground"
          )}>
            {timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </time>
        </div>
      </div>
    </div>
  );
};

export default Message;