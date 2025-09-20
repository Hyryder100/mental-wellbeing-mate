interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestedActions?: string[];
}

interface AIResponse {
  text: string;
  suggestedActions?: string[];
  requiresCrisisSupport?: boolean;
}

// Crisis keywords that trigger immediate support resources
const crisisKeywords = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die', 
  'self harm', 'hurt myself', 'cut myself', 'overdose', 'end it all',
  'no point living', 'better off dead', 'worthless', 'hopeless'
];

// Emotional keywords for contextual responses
const emotionalKeywords = {
  anxiety: ['anxious', 'worried', 'nervous', 'panic', 'overwhelmed', 'stressed'],
  depression: ['sad', 'depressed', 'empty', 'numb', 'hopeless', 'lonely'],
  anger: ['angry', 'frustrated', 'mad', 'furious', 'annoyed', 'irritated'],
  grief: ['grief', 'loss', 'mourning', 'miss', 'died', 'death', 'funeral'],
  trauma: ['trauma', 'ptsd', 'flashback', 'nightmare', 'triggered', 'abuse'],
  relationships: ['relationship', 'partner', 'boyfriend', 'girlfriend', 'marriage', 'divorce', 'breakup'],
  work: ['work', 'job', 'career', 'boss', 'colleague', 'unemployed', 'fired'],
  family: ['family', 'parents', 'mother', 'father', 'sibling', 'children']
};

const responses = {
  greeting: [
    "Thank you for sharing with me. I'm here to listen and support you through whatever you're experiencing. Can you tell me more about what's been on your mind?",
    "I'm glad you reached out. This is a safe space where you can express yourself freely. What would you like to talk about today?",
    "It takes courage to open up, and I want you to know that I'm here to listen without judgment. How can I support you right now?"
  ],
  
  anxiety: [
    "I hear that you're feeling anxious, and I want you to know that what you're experiencing is valid. Anxiety can feel overwhelming, but you're not alone in this. Have you noticed any particular triggers or patterns?",
    "Anxiety can make everything feel more intense and scary. It's completely understandable that you're struggling with this. Sometimes it helps to focus on small, manageable steps. What feels most overwhelming right now?",
    "Thank you for sharing about your anxiety with me. It shows a lot of self-awareness to recognize these feelings. Remember that anxiety, while uncomfortable, is temporary. What usually helps you feel a bit more grounded?"
  ],
  
  depression: [
    "I'm really glad you felt comfortable sharing these feelings with me. Depression can make everything feel heavy and difficult, but please know that you matter and your feelings are important. You're taking a brave step by talking about it.",
    "What you're describing sounds incredibly difficult to carry. Depression has a way of making us feel isolated and hopeless, but I want you to know that you're not alone. Even in the darkest moments, there is hope for things to feel different.",
    "Thank you for trusting me with these deep feelings. When we're depressed, it can feel like the pain will never end, but feelings do change over time. You've shown strength by reaching out, even when it feels hard to do anything at all."
  ],
  
  anger: [
    "It sounds like you're experiencing some really intense anger, and I want you to know that anger is a completely valid emotion. Sometimes anger can be trying to tell us something important. What do you think might be underneath these feelings?",
    "I can hear the frustration in what you're sharing, and it makes complete sense that you'd feel this way. Anger often shows up when we feel hurt, unheard, or when our boundaries have been crossed. Would you like to talk about what's triggering these feelings?",
    "Thank you for being honest about your anger. It takes courage to acknowledge difficult emotions like this. Sometimes anger can be a sign that something important to us has been threatened or violated. What feels most important to you right now?"
  ],
  
  grief: [
    "I'm so sorry for your loss. Grief is one of the most profound human experiences, and there's no right or wrong way to go through it. Please be patient and gentle with yourself during this incredibly difficult time.",
    "Loss changes us in ways we never expect, and the pain you're feeling is a reflection of how much love you have. Grief doesn't follow a timeline, and it's okay to feel whatever comes up. What has been the hardest part for you?",
    "Thank you for sharing something so personal and painful with me. Grief can feel isolating, but you don't have to carry this alone. Your feelings are completely natural and valid. What do you need most right now?"
  ],
  
  supportive: [
    "I want you to know that I hear you, and what you're going through matters. You've shown real courage by sharing this with me. How are you taking care of yourself during this difficult time?",
    "It sounds like you're dealing with a lot right now, and I want you to know that your feelings are completely valid. You don't have to go through this alone. What kind of support feels most helpful to you?",
    "Thank you for trusting me with what you're experiencing. It takes strength to reach out, especially when things feel overwhelming. Remember that you've gotten through difficult times before, and you have that same resilience now."
  ],
  
  encouragement: [
    "I believe in your ability to work through this. You've already taken an important step by reaching out and talking about what you're experiencing. That shows real self-awareness and strength.",
    "Even though things feel difficult right now, I want you to remember that you have value and that your life matters. Small steps forward are still progress, even when they don't feel like much.",
    "You're being incredibly brave by facing these feelings and talking about them. Healing isn't linear, and it's okay to take things one day at a time. What's one small thing that might bring you a little comfort today?"
  ]
};

const copingStrategies = {
  breathing: [
    "Would you like to try a simple breathing exercise together? Sometimes focusing on our breath can help create a little space from overwhelming feelings.",
    "When anxiety feels intense, our breathing often becomes shallow. Taking slow, deep breaths can help signal to your nervous system that you're safe."
  ],
  grounding: [
    "It might help to try a grounding technique. Can you name 5 things you can see around you right now? This can help bring you back to the present moment.",
    "Sometimes when emotions feel overwhelming, it helps to focus on physical sensations. What can you feel right now - the chair you're sitting in, the temperature of the air, or the ground under your feet?"
  ],
  selfcare: [
    "Have you been able to take care of your basic needs today? Sometimes when we're struggling, small acts of self-care like drinking water, eating something nourishing, or taking a warm shower can help.",
    "What's one gentle thing you could do for yourself today? It could be as simple as making a cup of tea, stepping outside for fresh air, or listening to music you enjoy."
  ]
};

function detectEmotion(text: string): string[] {
  const emotions: string[] = [];
  const lowerText = text.toLowerCase();
  
  for (const [emotion, keywords] of Object.entries(emotionalKeywords)) {
    if (keywords.some(keyword => lowerText.includes(keyword))) {
      emotions.push(emotion);
    }
  }
  
  return emotions;
}

function checkForCrisis(text: string): boolean {
  const lowerText = text.toLowerCase();
  return crisisKeywords.some(keyword => lowerText.includes(keyword));
}

function getRandomResponse(responseArray: string[]): string {
  return responseArray[Math.floor(Math.random() * responseArray.length)];
}

function generateSuggestedActions(emotions: string[], isCrisis: boolean): string[] {
  if (isCrisis) {
    return ["I need immediate help", "Talk to someone now", "Crisis resources"];
  }
  
  const suggestions: string[] = [];
  
  if (emotions.includes('anxiety')) {
    suggestions.push("Help me feel calmer", "Breathing exercise", "Grounding technique");
  }
  
  if (emotions.includes('depression')) {
    suggestions.push("I feel hopeless", "Small self-care ideas", "Find motivation");
  }
  
  if (emotions.includes('anger')) {
    suggestions.push("Help me process anger", "Healthy ways to cope", "Understanding my triggers");
  }
  
  if (emotions.includes('grief')) {
    suggestions.push("Coping with loss", "Honoring memories", "Support for grieving");
  }
  
  // Default suggestions if no specific emotions detected
  if (suggestions.length === 0) {
    suggestions.push("Tell me more", "Coping strategies", "I need encouragement");
  }
  
  return suggestions.slice(0, 3); // Limit to 3 suggestions
}

export async function getAIResponse(userMessage: string, conversationHistory: Message[]): Promise<AIResponse> {
  const emotions = detectEmotion(userMessage);
  const isCrisis = checkForCrisis(userMessage);
  
  if (isCrisis) {
    return {
      text: "I'm really concerned about what you've shared with me. What you're feeling is important, and I want you to know that help is available. You deserve support right now. I'm going to show you some crisis resources where you can talk to trained professionals who can provide immediate help. Please know that you're not alone, and there are people who want to help you through this.",
      requiresCrisisSupport: true,
      suggestedActions: ["Get crisis support now", "Talk to a professional", "I'm in immediate danger"]
    };
  }
  
  let responseText = "";
  
  // Choose response based on detected emotions
  if (emotions.includes('anxiety')) {
    responseText = getRandomResponse(responses.anxiety);
    // Add coping strategy
    if (Math.random() > 0.5) {
      responseText += " " + getRandomResponse(copingStrategies.breathing);
    }
  } else if (emotions.includes('depression')) {
    responseText = getRandomResponse(responses.depression);
    if (Math.random() > 0.5) {
      responseText += " " + getRandomResponse(copingStrategies.selfcare);
    }
  } else if (emotions.includes('anger')) {
    responseText = getRandomResponse(responses.anger);
    if (Math.random() > 0.5) {
      responseText += " " + getRandomResponse(copingStrategies.grounding);
    }
  } else if (emotions.includes('grief')) {
    responseText = getRandomResponse(responses.grief);
  } else if (conversationHistory.length <= 2) {
    // Early in conversation
    responseText = getRandomResponse(responses.greeting);
  } else {
    // General supportive response
    responseText = getRandomResponse(responses.supportive);
    if (Math.random() > 0.6) {
      responseText += " " + getRandomResponse(responses.encouragement);
    }
  }
  
  return {
    text: responseText,
    suggestedActions: generateSuggestedActions(emotions, isCrisis),
    requiresCrisisSupport: isCrisis
  };
}