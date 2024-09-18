import React from 'react';

const FinalResponse = ({ response }) => {
  return (
    <div className="bg-green-100 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">Final Response</h2>
      <div className="h-40 overflow-y-auto">
        <p>{response}</p>
      </div>
    </div>
  );
};

export default FinalResponse;