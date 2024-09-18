import React from 'react';

const ChatArea = ({ title, response }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="h-40 overflow-y-auto">
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatArea;