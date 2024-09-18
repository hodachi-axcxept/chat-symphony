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
      const claudePrompt = `In Japanese, GPT-4o provided the following guidance: "${gpt4InitialResponse}". Based on this, please answer the user's question: "${question}"`;
      const claudeResp = await callClaude(claudeKey, claudePrompt);
      setClaudeResponse(claudeResp);

      // Step 3: Call Gemini
      const geminiPrompt = `In Japanese, Claude responded with: "${claudeResp}". Please provide a critical reflection on this response to the original question: "${question}"`;
      const geminiResp = await callGemini(geminiKey, geminiPrompt);
      setGeminiResponse(geminiResp);

      // Step 4: Final GPT-4 summary
      const finalPrompt = `In Japanese, Summarize the following conversation and provide a final response to the user:
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
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Multi-AI Chat Bot</h1>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <ApiKeyInput label="OpenAI API Key" value={openAIKey} onChange={setOpenAIKey} />
        <ApiKeyInput label="Claude API Key" value={claudeKey} onChange={setClaudeKey} />
        <ApiKeyInput label="Gemini API Key" value={geminiKey} onChange={setGeminiKey} />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <ChatArea title="GPT-4" response={gpt4Response} />
        <ChatArea title="Claude 3.5 Sonnet" response={claudeResponse} />
        <ChatArea title="Gemini Flash" response={geminiResponse} />
        <FinalResponse response={finalResponse} />
      </div>
      <UserInput onSubmit={handleUserInput} isLoading={isLoading} />
    </div>
  );
};

export default Index;
