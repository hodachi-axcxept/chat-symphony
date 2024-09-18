import React, { useState } from 'react';

const UserInput = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask your question here..."
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="mt-2 bg-blue-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default UserInput;