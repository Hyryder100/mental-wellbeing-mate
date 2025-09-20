import { Button } from '@/components/ui/button';
import { Heart, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestedActions?: string[];
}

interface ChatMessageProps {
  message: Message;
  onSuggestedAction: (action: string) => void;
}

export const ChatMessage = ({ message, onSuggestedAction }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex space-x-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          message.isUser 
            ? 'bg-primary/10' 
            : 'bg-healing/20'
        }`}>
          {message.isUser ? (
            <User className="w-4 h-4 text-primary" />
          ) : (
            <Heart className="w-4 h-4 text-healing" />
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1">
          <div className={`rounded-2xl px-4 py-3 transition-[var(--transition-gentle)] ${
            message.isUser
              ? 'bg-primary text-primary-foreground ml-4'
              : 'bg-muted text-foreground mr-4'
          }`}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
          </div>

          {/* Suggested Actions */}
          {message.suggestedActions && message.suggestedActions.length > 0 && (
            <div className="mt-3 space-y-2">
              <p className="text-xs text-muted-foreground px-2">Quick responses:</p>
              <div className="flex flex-wrap gap-2">
                {message.suggestedActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => onSuggestedAction(action)}
                    className="text-xs border-primary/20 text-primary hover:bg-primary/10 transition-[var(--transition-gentle)]"
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Timestamp */}
          <p className="text-xs text-muted-foreground mt-2 px-2">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
};