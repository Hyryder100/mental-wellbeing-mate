import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Wind, BookOpen, Anchor, Lightbulb, Play, Pause } from 'lucide-react';

interface CopingTechniquesProps {
  onBack: () => void;
}

export const CopingTechniques = ({ onBack }: CopingTechniquesProps) => {
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  const startBreathingExercise = () => {
    setBreathingActive(true);
    const cycle = () => {
      setBreathingPhase('inhale');
      setTimeout(() => setBreathingPhase('hold'), 4000);
      setTimeout(() => setBreathingPhase('exhale'), 8000);
      setTimeout(() => {
        if (breathingActive) cycle();
      }, 12000);
    };
    cycle();
  };

  const stopBreathingExercise = () => {
    setBreathingActive(false);
    setBreathingPhase('inhale');
  };

  const journalPrompts = [
    "What are three things I'm grateful for today?",
    "How am I feeling right now, and what might be causing these feelings?",
    "What small accomplishment made me proud recently?",
    "What would I tell a friend who was going through what I'm experiencing?",
    "What are some positive qualities about myself I sometimes forget?",
    "What activities bring me joy and peace?",
    "What am I learning about myself through this challenging time?",
    "What support do I have in my life right now?"
  ];

  const groundingTechniques = [
    {
      title: "5-4-3-2-1 Technique",
      description: "Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste."
    },
    {
      title: "Temperature Technique",
      description: "Hold an ice cube, splash cold water on your face, or take a warm shower to ground yourself in physical sensations."
    },
    {
      title: "Progressive Muscle Relaxation",
      description: "Tense and then relax each muscle group in your body, starting from your toes and working up to your head."
    },
    {
      title: "Mindful Observation",
      description: "Pick an object nearby and study it intently for 2-3 minutes, noticing every detail about its color, texture, and shape."
    }
  ];

  const getBreathingInstruction = () => {
    switch (breathingPhase) {
      case 'inhale': return 'Breathe In...';
      case 'hold': return 'Hold...';
      case 'exhale': return 'Breathe Out...';
    }
  };

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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-healing/20 rounded-full">
              <Lightbulb className="w-8 h-8 text-healing" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Coping Techniques</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, effective tools to help you manage difficult emotions and find moments of peace.
            </p>
          </div>
        </div>

        <Tabs defaultValue="breathing" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="breathing" className="flex items-center space-x-2">
              <Wind className="w-4 h-4" />
              <span>Breathing</span>
            </TabsTrigger>
            <TabsTrigger value="journaling" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Journaling</span>
            </TabsTrigger>
            <TabsTrigger value="grounding" className="flex items-center space-x-2">
              <Anchor className="w-4 h-4" />
              <span>Grounding</span>
            </TabsTrigger>
            <TabsTrigger value="affirmations" className="flex items-center space-x-2">
              <Lightbulb className="w-4 h-4" />
              <span>Affirmations</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="breathing">
            <Card className="p-8 text-center shadow-[var(--shadow-warm)]">
              <h3 className="text-2xl font-semibold mb-6">4-7-8 Breathing Exercise</h3>
              
              <div className="mb-8">
                <div className={`w-32 h-32 mx-auto rounded-full border-4 border-primary/30 flex items-center justify-center transition-all duration-1000 ${
                  breathingActive ? 'animate-pulse' : ''
                } ${
                  breathingPhase === 'inhale' ? 'scale-110 bg-healing/20' :
                  breathingPhase === 'hold' ? 'scale-105 bg-warmth/20' :
                  'scale-95 bg-calm/20'
                }`}>
                  <div className="text-center">
                    {breathingActive && (
                      <>
                        <div className="text-lg font-semibold text-primary">{getBreathingInstruction()}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {breathingPhase === 'inhale' ? '4 seconds' :
                           breathingPhase === 'hold' ? '7 seconds' :
                           '8 seconds'}
                        </div>
                      </>
                    )}
                    {!breathingActive && (
                      <Wind className="w-12 h-12 text-primary" />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. This helps activate your body's relaxation response.
                </p>
                
                <Button
                  onClick={breathingActive ? stopBreathingExercise : startBreathingExercise}
                  className="bg-primary hover:bg-primary-hover text-primary-foreground"
                >
                  {breathingActive ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Stop Exercise
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Exercise
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="journaling">
            <div className="space-y-6">
              <Card className="p-6 shadow-[var(--shadow-warm)]">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Journaling Prompts</h3>
                <p className="text-muted-foreground mb-6">
                  Writing can help you process emotions and gain clarity. Choose a prompt that resonates with you today.
                </p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  {journalPrompts.map((prompt, index) => (
                    <Card key={index} className="p-4 bg-muted/50 border-border/50 hover:bg-accent/20 transition-[var(--transition-gentle)] cursor-pointer">
                      <p className="text-sm text-foreground italic">"{prompt}"</p>
                    </Card>
                  ))}
                </div>
              </Card>
              
              <Card className="p-6 bg-warmth/10 border-warmth/20">
                <h4 className="font-semibold mb-3 text-foreground">Tips for Effective Journaling</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Write without worrying about grammar or spelling</li>
                  <li>• Set aside 10-15 minutes of uninterrupted time</li>
                  <li>• Focus on your feelings rather than just events</li>
                  <li>• Be honest and compassionate with yourself</li>
                </ul>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="grounding">
            <div className="space-y-6">
              {groundingTechniques.map((technique, index) => (
                <Card key={index} className="p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-warm)] transition-[var(--transition-gentle)]">
                  <h3 className="text-lg font-semibold mb-3 text-foreground">{technique.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{technique.description}</p>
                </Card>
              ))}
              
              <Card className="p-6 bg-healing/10 border-healing/20">
                <h4 className="font-semibold mb-3 text-foreground">When to Use Grounding Techniques</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Grounding techniques are especially helpful when you feel disconnected, overwhelmed, anxious, or experiencing intrusive thoughts. They help bring your attention back to the present moment and your physical surroundings.
                </p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="affirmations">
            <Card className="p-8 shadow-[var(--shadow-warm)]">
              <h3 className="text-2xl font-semibold mb-6 text-center text-foreground">Positive Affirmations</h3>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  "I am worthy of love and compassion",
                  "This difficult moment will pass",
                  "I have the strength to overcome challenges",
                  "My feelings are valid and important",
                  "I am doing my best with what I have",
                  "I deserve peace and happiness",
                  "I am resilient and capable",
                  "I choose to be kind to myself",
                  "Every day brings new possibilities"
                ].map((affirmation, index) => (
                  <Card key={index} className="p-4 bg-gradient-to-br from-healing/10 to-calm/10 border-healing/20 text-center">
                    <p className="text-foreground font-medium">"{affirmation}"</p>
                  </Card>
                ))}
              </div>
              
              <Card className="mt-6 p-4 bg-accent/10 border-accent/20">
                <p className="text-center text-muted-foreground">
                  Read these affirmations slowly and mindfully. Choose one that resonates with you and repeat it throughout the day.
                </p>
              </Card>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};