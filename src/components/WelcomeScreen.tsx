import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, MessageCircle, Shield, Clock } from 'lucide-react';

interface WelcomeScreenProps {
  onStartChat: () => void;
  onCrisisSupport: () => void;
}

export const WelcomeScreen = ({ onStartChat, onCrisisSupport }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-healing/20 rounded-full mb-4">
            <Heart className="w-8 h-8 text-healing" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">
            Your Safe Space
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto">
            A caring AI companion ready to listen, support, and help you navigate life's challenges with compassion and understanding.
          </p>
        </div>

        <Card className="p-8 shadow-[var(--shadow-warm)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start space-x-3">
              <div className="bg-calm/30 p-2 rounded-lg">
                <MessageCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Empathetic Listening</h3>
                <p className="text-sm text-muted-foreground">Non-judgmental conversations that validate your feelings</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-warmth/30 p-2 rounded-lg">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Safe & Private</h3>
                <p className="text-sm text-muted-foreground">Your conversations are completely confidential</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-healing/30 p-2 rounded-lg">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Coping Strategies</h3>
                <p className="text-sm text-muted-foreground">Practical techniques for managing difficult emotions</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="bg-accent/30 p-2 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">24/7 Available</h3>
                <p className="text-sm text-muted-foreground">Here whenever you need someone to talk to</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={onStartChat}
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-6 text-lg transition-[var(--transition-gentle)]"
              size="lg"
            >
              Start a Conversation
            </Button>
            
            <Button 
              onClick={onCrisisSupport}
              variant="outline"
              className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              Crisis Support Resources
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Remember: This is a supportive companion, not a replacement for professional mental health care.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};