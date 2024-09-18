import React from 'react';

const FinalResponse = ({ response }) => {
  return (
    <div className="bg-purple-100 p-4 rounded-lg shadow-md border-2 border-purple-400">
      <h2 className="text-lg font-semibold mb-3 text-purple-800">Final Response</h2>
      <div className="h-64 overflow-y-auto bg-white bg-opacity-60 p-4 rounded-md">
        <p className="text-sm text-gray-700">{response}</p>
      </div>
    </div>
  );
};

export default FinalResponse;
