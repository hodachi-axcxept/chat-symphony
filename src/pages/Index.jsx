import React, { useState } from 'react';
import ChatArea from '../components/ChatArea';
import UserInput from '../components/UserInput';
import FinalResponse from '../components/FinalResponse';

const Index = () => {
  const [userQuestion, setUserQuestion] = useState('');
  const [gpt4Response, setGpt4Response] = useState('');
  const [claudeResponse, setClaudeResponse] = useState('');
  const [geminiResponse, setGeminiResponse] = useState('');
  const [finalResponse, setFinalResponse] = useState('');

  const handleUserInput = (question) => {
    setUserQuestion(question);
    // Here we would typically call the API for each AI model
    // For now, we'll simulate responses
    setGpt4Response("GPT-4: Here's how we should approach this question...");
    setClaudeResponse("Claude: Thank you for the guidance. Here's my response...");
    setGeminiResponse("Gemini: Reflecting on Claude's response, I think...");
    setFinalResponse("Final GPT-4: After considering all perspectives, here's the summary...");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Multi-AI Chat Bot</h1>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <ChatArea title="GPT-4" response={gpt4Response} />
        <ChatArea title="Claude 3.5 Sonnet" response={claudeResponse} />
        <ChatArea title="Gemini Flash" response={geminiResponse} />
        <FinalResponse response={finalResponse} />
      </div>
      <UserInput onSubmit={handleUserInput} />
    </div>
  );
};

export default Index;
