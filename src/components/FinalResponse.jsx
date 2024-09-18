import React from 'react';

const FinalResponse = ({ response }) => {
  return (
    <div className="bg-green-100 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Final Response</h2>
      <div className="h-60 overflow-y-auto bg-white p-3 rounded">
        <p className="text-sm">{response}</p>
      </div>
    </div>
  );
};

export default FinalResponse;
