import { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { CrisisSupport } from '@/components/CrisisSupport';

const Index = () => {
  const [chatStarted, setChatStarted] = useState(false);
  const [showCrisisSupport, setShowCrisisSupport] = useState(false);

  if (showCrisisSupport) {
    return <CrisisSupport onBack={() => setShowCrisisSupport(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-calm/20 to-warmth/20">
      {!chatStarted ? (
        <WelcomeScreen 
          onStartChat={() => setChatStarted(true)}
          onCrisisSupport={() => setShowCrisisSupport(true)}
        />
      ) : (
        <ChatInterface onCrisisSupport={() => setShowCrisisSupport(true)} />
      )}
    </div>
  );
};

export default Index;