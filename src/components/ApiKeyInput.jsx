import React from 'react';

const ApiKeyInput = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 rounded-md border-2 border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-sm transition duration-300"
        placeholder="Enter API Key"
      />
    </div>
  );
};

export default ApiKeyInput;
