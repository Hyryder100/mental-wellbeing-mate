import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('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');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Chat AI function called');
    
    if (!OPENAI_API_KEY) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not configured');
    }

    const { message, conversationHistory } = await req.json();
    console.log('Received message:', message);

    // Check for crisis keywords
    const crisisKeywords = [
      'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die', 
      'self harm', 'hurt myself', 'cut myself', 'overdose', 'end it all',
      'no point living', 'better off dead', 'worthless', 'hopeless'
    ];
    
    const isCrisis = crisisKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );

    if (isCrisis) {
      console.log('Crisis situation detected');
      return new Response(JSON.stringify({
        text: "I'm really concerned about what you've shared with me. What you're feeling is important, and I want you to know that help is available. You deserve support right now. I'm going to show you some crisis resources where you can talk to trained professionals who can provide immediate help. Please know that you're not alone, and there are people who want to help you through this.",
        requiresCrisisSupport: true,
        suggestedActions: ["Get crisis support now", "Talk to a professional", "I'm in immediate danger"]
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Build conversation context for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are a compassionate AI mental health companion. Your role is to:
        
        1. Listen with empathy and validate emotions
        2. Provide supportive, non-judgmental responses
        3. Offer gentle coping strategies when appropriate
        4. Encourage professional help when needed
        5. Never provide medical advice or diagnoses
        
        Guidelines:
        - Use warm, empathetic language
        - Acknowledge and validate feelings
        - Ask open-ended questions to encourage sharing
        - Suggest breathing exercises, grounding techniques, or self-care when helpful
        - Keep responses conversational and human-like
        - If someone mentions serious mental health concerns, gently suggest professional support
        
        Respond as a caring friend who is trained in active listening and emotional support.`
      }
    ];

    // Add conversation history (last 10 messages to keep context manageable)
    const recentHistory = (conversationHistory || []).slice(-10);
    for (const msg of recentHistory) {
      messages.push({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      });
    }

    // Add current message
    messages.push({
      role: 'user',
      content: message
    });

    console.log('Calling OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', response.status, errorData);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');

    const aiText = data.choices[0].message.content;

    // Generate contextual suggested actions
    const generateSuggestedActions = (message: string): string[] => {
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('panic')) {
        return ["Help me feel calmer", "Breathing exercise", "Grounding technique"];
      }
      
      if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('empty')) {
        return ["I feel hopeless", "Small self-care ideas", "Find motivation"];
      }
      
      if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated') || lowerMessage.includes('mad')) {
        return ["Help me process anger", "Healthy ways to cope", "Understanding my triggers"];
      }
      
      if (lowerMessage.includes('grief') || lowerMessage.includes('loss') || lowerMessage.includes('died')) {
        return ["Coping with loss", "Honoring memories", "Support for grieving"];
      }
      
      // Default suggestions
      return ["Tell me more", "Coping strategies", "I need encouragement"];
    };

    return new Response(JSON.stringify({
      text: aiText,
      suggestedActions: generateSuggestedActions(message),
      requiresCrisisSupport: false
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in chat-ai function:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate AI response',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
