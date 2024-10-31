import React, { useState } from 'react';

const TitleForm = ({ onAddTitle, isWalletConnected }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTitle({ title });
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-4 space-x-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New Title"
        className={`flex-grow px-4 py-2 border rounded-lg focus:outline-none ${
          isWalletConnected
            ? 'border-gray-300 focus:border-blue-500 bg-white'
            : 'border-gray-200 bg-gray-100 cursor-not-allowed text-gray-400'
        }`}
        required
        disabled={!isWalletConnected}
      />
      <button
        type="submit"
        className={`px-4 py-2 font-semibold rounded-lg whitespace-nowrap ${
          isWalletConnected
            ? 'bg-green-500 text-white hover:bg-green-600'
            : 'bg-gray-300 text-gray-400 cursor-not-allowed'
        }`}
        disabled={!isWalletConnected}
      >
        Add Title
      </button>
    </form>
  );
};

export default TitleForm;
