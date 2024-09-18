import React, { useState } from 'react';

const UserInput = ({ onSubmit, isLoading }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading && input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask your question here..."
        className="w-full p-3 border-2 border-purple-300 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition duration-300"
        disabled={isLoading}
      />
      <button 
        type="submit" 
        className={`mt-3 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-lg text-sm font-semibold transition duration-300 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:from-purple-600 hover:to-blue-600'}`}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Submit'}
      </button>
    </form>
  );
};

export default UserInput;
