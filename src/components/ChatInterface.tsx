import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, LifeBuoy, Heart, Sparkles } from 'lucide-react';
import { ChatMessage } from '@/components/ChatMessage';
import { CopingTechniques } from '@/components/CopingTechniques';
import { getAIResponse } from '@/lib/aiResponses';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestedActions?: string[];
}

interface ChatInterfaceProps {
  onCrisisSupport: () => void;
}

export const ChatInterface = ({ onCrisisSupport }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello there 💙 I'm here to listen and support you. This is your safe space where you can share whatever is on your mind. How are you feeling today?",
      isUser: false,
      timestamp: new Date(),
      suggestedActions: ["I'm feeling overwhelmed", "I need someone to talk to", "I'm having a difficult day"]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCoping, setShowCoping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(async () => {
      const aiResponse = await getAIResponse(text.trim(), messages);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        isUser: false,
        timestamp: new Date(),
        suggestedActions: aiResponse.suggestedActions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // Check for crisis keywords and show support if needed
      if (aiResponse.requiresCrisisSupport) {
        setTimeout(() => onCrisisSupport(), 2000);
      }
    }, 1000 + Math.random() * 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  if (showCoping) {
    return <CopingTechniques onBack={() => setShowCoping(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-healing/20 p-2 rounded-full">
              <Heart className="w-5 h-5 text-healing" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Your AI Companion</h2>
              <p className="text-sm text-muted-foreground">Here to listen and support you</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCoping(true)}
              className="text-primary border-primary/20 hover:bg-primary/10"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Coping Tools
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onCrisisSupport}
              className="text-destructive border-destructive/20 hover:bg-destructive/10"
            >
              <LifeBuoy className="w-4 h-4 mr-2" />
              Crisis Support
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 max-w-4xl mx-auto w-full p-4">
        <Card className="h-[calc(100vh-200px)] shadow-[var(--shadow-soft)]">
          <ScrollArea ref={scrollAreaRef} className="h-full p-6">
            <div className="space-y-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onSuggestedAction={handleSendMessage}
                />
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <div className="bg-muted p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Input Area */}
      <div className="bg-card/80 backdrop-blur-sm border-t border-border/50 p-4">
        <div className="max-w-4xl mx-auto flex space-x-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind... I'm here to listen."
            className="flex-1 bg-background border-border/50 focus:border-primary/50 rounded-full px-6 py-3"
            disabled={isTyping}
          />
          <Button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || isTyping}
            className="bg-primary hover:bg-primary-hover text-primary-foreground rounded-full px-6 transition-[var(--transition-gentle)]"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};