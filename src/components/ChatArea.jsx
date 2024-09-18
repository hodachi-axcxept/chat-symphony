import React from 'react';

const ChatArea = ({ title, response, bgColor, borderColor }) => {
  return (
    <div className={`${bgColor} p-4 rounded-lg shadow-md border-2 ${borderColor}`}>
      <h2 className="text-lg font-semibold mb-3 text-gray-800">{title}</h2>
      <div className="h-64 overflow-y-auto bg-white bg-opacity-60 p-4 rounded-md">
        <p className="text-sm text-gray-700">{response}</p>
      </div>
    </div>
  );
};

export default ChatArea;
