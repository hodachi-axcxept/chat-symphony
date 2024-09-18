import React from 'react';

const ChatArea = ({ title, response }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="h-60 overflow-y-auto bg-gray-50 p-3 rounded">
        <p className="text-sm">{response}</p>
      </div>
    </div>
  );
};

export default ChatArea;
