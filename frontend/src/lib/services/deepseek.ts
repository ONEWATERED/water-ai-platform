const DEEPSEEK_API_ENDPOINT = 'https://api.deepseek.com/v1/chat/completions';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  id: string;
  choices: {
    message: ChatMessage;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

const systemPrompt = `You are OneWater AI, an expert assistant specializing in water management, treatment, and conservation. You have deep knowledge of:

1. Water Treatment Technologies
   - Conventional treatment processes
   - Advanced oxidation processes
   - Membrane filtration
   - Biological treatment methods

2. Water Quality
   - Testing and monitoring
   - Regulatory standards
   - Contaminants and pollutants
   - Water chemistry

3. Water Conservation
   - Sustainable practices
   - Water reuse systems
   - Efficiency improvements
   - Smart water management

4. Water Infrastructure
   - Distribution systems
   - Storage solutions
   - Smart metering
   - Leak detection

Provide accurate, technical, yet understandable responses. When relevant, cite scientific sources or industry standards. If you're unsure about something, acknowledge the uncertainty and suggest reliable sources for more information.`;

// Mock response function for development
async function getMockResponse(message: string): Promise<ChatResponse> {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  return {
    id: 'mock-' + Date.now(),
    choices: [{
      message: {
        role: 'assistant',
        content: `This is a mock response as no API key is configured. Your message was: "${message}"\n\nTo enable real AI responses, please add your DeepSeek API key to the environment variables.`
      },
      finish_reason: 'stop'
    }],
    usage: {
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0
    }
  };
}

export async function sendChatMessage(messages: ChatMessage[]): Promise<ChatResponse> {
  const apiKey = process.env.NEXT_PUBLIC_DEEPSEEK_API_KEY;
  
  // If no API key is provided, return a mock response
  if (!apiKey || apiKey === 'your_deepseek_api_key_here') {
    const lastMessage = messages[messages.length - 1];
    return getMockResponse(lastMessage.content);
  }

  // Always include the system prompt as the first message
  const fullMessages = [
    { role: 'system', content: systemPrompt },
    ...messages
  ];

  try {
    const response = await fetch(DEEPSEEK_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: fullMessages,
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 0.95,
        frequency_penalty: 0,
        presence_penalty: 0,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to get response from DeepSeek AI');
    }

    return response.json();
  } catch (error) {
    console.error('Error calling DeepSeek AI:', error);
    throw error;
  }
}
