import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Phone, MessageSquare, Globe, Heart } from 'lucide-react';

interface CrisisSupportProps {
  onBack: () => void;
}

export const CrisisSupport = ({ onBack }: CrisisSupportProps) => {
  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 crisis support and suicide prevention",
      icon: Phone,
      color: "text-destructive"
    },
    {
      name: "Crisis Text Line",
      number: "Text HOME to 741741",
      description: "24/7 crisis support via text message",
      icon: MessageSquare,
      color: "text-primary"
    },
    {
      name: "SAMHSA National Helpline",
      number: "1-800-662-4357",
      description: "Mental health and substance abuse information",
      icon: Phone,
      color: "text-healing"
    },
    {
      name: "International Association for Suicide Prevention",
      number: "Visit iasp.info",
      description: "Global crisis centers and resources",
      icon: Globe,
      color: "text-accent-foreground"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-calm/20 to-warmth/20 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={onBack}
            variant="ghost"
            className="mb-4 text-primary hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Chat
          </Button>
          
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-destructive/20 rounded-full">
              <Heart className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Crisis Support Resources</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              If you're experiencing thoughts of self-harm, suicide, or are in immediate danger, please reach out for professional help immediately.
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {crisisResources.map((resource, index) => (
            <Card key={index} className="p-6 shadow-[var(--shadow-warm)] hover:shadow-[var(--shadow-soft)] transition-[var(--transition-gentle)]">
              <div className="flex items-start space-x-4">
                <div className="bg-muted p-3 rounded-lg">
                  <resource.icon className={`w-6 h-6 ${resource.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-lg mb-2">{resource.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-2">{resource.number}</p>
                  <p className="text-muted-foreground">{resource.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-6 bg-warmth/10 border-warmth/20">
          <h3 className="font-semibold text-foreground text-lg mb-4">Emergency Situations</h3>
          <div className="space-y-3 text-muted-foreground">
            <p>• If you're in immediate physical danger, call 911 (US) or your local emergency number</p>
            <p>• If you're having suicidal thoughts, call 988 (US) for immediate support</p>
            <p>• Consider going to your nearest emergency room if you're in crisis</p>
            <p>• Reach out to a trusted friend, family member, or mental health professional</p>
          </div>
        </Card>

        <Card className="mt-6 p-6 bg-healing/10 border-healing/20">
          <h3 className="font-semibold text-foreground text-lg mb-4">You Are Not Alone</h3>
          <p className="text-muted-foreground leading-relaxed">
            Your life has value and meaning. Many people have felt the way you're feeling right now and have found their way through difficult times. Professional help is available, and recovery is possible. Taking the step to reach out shows incredible strength and courage.
          </p>
        </Card>
      </div>
    </div>
  );
};