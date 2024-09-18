import React, { useState } from 'react';
import ChatArea from '../components/ChatArea';
import UserInput from '../components/UserInput';
import FinalResponse from '../components/FinalResponse';
import ApiKeyInput from '../components/ApiKeyInput';
import { callOpenAI, callClaude, callGemini } from '../utils/apiCalls';

const Index = () => {
  const [userQuestion, setUserQuestion] = useState('');
  const [gpt4Response, setGpt4Response] = useState('');
  const [claudeResponse, setClaudeResponse] = useState('');
  const [geminiResponse, setGeminiResponse] = useState('');
  const [finalResponse, setFinalResponse] = useState('');
  const [openAIKey, setOpenAIKey] = useState('');
  const [claudeKey, setClaudeKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUserInput = async (question) => {
    setIsLoading(true);
    setUserQuestion(question);

    try {
      // Step 1: Call GPT-4
      const gpt4InitialResponse = await callOpenAI(openAIKey, question, true);
      setGpt4Response(gpt4InitialResponse);

      // Step 2: Call Claude
      const claudePrompt = `ユーザーの回答にこたえる方法をGPT-4oは検討し、次のステップに従うように指示した。 
      "${gpt4InitialResponse}". 
      
      このステップに従い、ユーザーの質問に答えてください： 
      "${question}"`;

      const claudeResp = await callGemini(geminiKey, claudePrompt);
      setClaudeResponse(claudeResp);

      // Step 3: Call Gemini
      const geminiPrompt = `ユーザーの質問： "${question}"。
      
      これに対しAnthropicのClaudeはこう答えた： 
      "${claudeResp}". 
      
      この回答に対して批判的思考でリフレクションしなさい`;
      const geminiResp = await callGemini(geminiKey, geminiPrompt);
      setGeminiResponse(geminiResp);

      // Step 4: Final GPT-4 summary
      const finalPrompt = `次の会話を要約し、ユーザーに最終的な返答をする。:
        User question: "${question}"
        GPT-4 initial response: "${gpt4InitialResponse}"
        Claude response: "${claudeResp}"
        Gemini reflection: "${geminiResp}"`;
        
      const finalResp = await callOpenAI(openAIKey, finalPrompt);
      setFinalResponse(finalResp);
    } catch (error) {
      console.error('Error in conversation flow:', error);
      setFinalResponse('An error occurred while processing your request.');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-sm">
      <h1 className="text-2xl font-bold mb-4 text-center">Multi-AI Chat Bot</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <ApiKeyInput label="OpenAI API Key" value={openAIKey} onChange={setOpenAIKey} />
        <ApiKeyInput label="Claude API Key" value={claudeKey} onChange={setClaudeKey} />
        <ApiKeyInput label="Gemini API Key" value={geminiKey} onChange={setGeminiKey} />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <ChatArea title="GPT-4o" response={gpt4Response} />
        <ChatArea title="GPT-4o-mini" response={claudeResponse} />
        <ChatArea title="Gemini Flash" response={geminiResponse} />
        <FinalResponse response={finalResponse} />
      </div>
      <UserInput onSubmit={handleUserInput} isLoading={isLoading} />
    </div>
  );
};

export default Index;
