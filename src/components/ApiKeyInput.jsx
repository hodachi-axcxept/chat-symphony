import React from 'react';

const ApiKeyInput = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-xs font-medium text-gray-700">{label}</label>
      <input
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm"
        placeholder="Enter API Key"
      />
    </div>
  );
};

export default ApiKeyInput;
