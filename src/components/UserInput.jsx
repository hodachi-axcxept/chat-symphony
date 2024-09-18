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
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask your question here..."
        className="w-full p-2 border border-gray-300 rounded text-sm"
        disabled={isLoading}
      />
      <button 
        type="submit" 
        className={`mt-2 bg-blue-500 text-white p-2 rounded text-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
        disabled={isLoading}
      >
        {isLoading ? 'Processing...' : 'Submit'}
      </button>
    </form>
  );
};

export default UserInput;
