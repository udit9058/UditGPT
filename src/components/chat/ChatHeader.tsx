import { Sun, Moon, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const ChatHeader = ({ isDark, toggleTheme }: ChatHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-header-background border-b border-header-border backdrop-blur supports-[backdrop-filter]:bg-header-background/90">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <MessageCircle className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">UditGPT</h1>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-10 w-10 rounded-lg hover:bg-secondary transition-colors"
        >
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  );
};

export default ChatHeader;