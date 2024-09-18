import axios from 'axios';

export const callOpenAI = async (apiKey, message, isInitial = false) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: isInitial ? "You are a helpful assistant. Provide a step-by-step approach to answer the user's question accurately and from multiple angles." : "You are a helpful assistant. Summarize the conversation and provide a final response."
          },
          { role: "user", content: message }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return 'Error: Unable to get response from OpenAI';
  }
};

export const callClaude = async (apiKey, message) => {
  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        messages: [{ role: "user", content: message }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
          'anthropic-version': '2023-06-01'
        }
      }
    );
    return response.data.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return 'Error: Unable to get response from Claude';
  }
};

export const callGemini = async (apiKey, message) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: message }] }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return 'Error: Unable to get response from Gemini';
  }
};
