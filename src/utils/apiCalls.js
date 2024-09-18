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
            content: isInitial ? "あなたはCoTのプロフェッショナルです。ユーザーからの質問に対して、回答するのではなく、CoTを用いて回答を明確にするためのステップを提供します。" : "gpt-4oと、Claude、geminiが会話した内容が返ってきました。あなたはそれらを受け取って、フレンドリーに回答してあげてください。"
          },
          { role: "user", content: "ユーザーからの質問とこれまでの会話：" + message }
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
        model: "claude-3-sonnet-20240229",
        max_tokens: 1024,
        messages: [{ role: "user", content: message }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        }
      }
    );
    return response.data.content[0].text;
  } catch (error) {
    return `Error: ${error.message}`;
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
