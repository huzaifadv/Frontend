// src/components/TodoInput.jsx
// Input component for adding new todos

import { useState } from 'react';

const TodoInput = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent empty todos
    if (!title.trim()) {
      return;
    }

    setIsAdding(true);
    try {
      await onAdd(title.trim());
      setTitle(''); // Clear input on success
    } catch (error) {
      console.error('Failed to add todo:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-6 py-4 rounded-xl border-2 border-purple-500/30 bg-white/5 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200"
        disabled={isAdding}
        aria-label="Todo title"
      />
      <button
        type="submit"
        disabled={isAdding || !title.trim()}
        className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold rounded-xl transition-all duration-200 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95"
        aria-label="Add todo"
      >
        {isAdding ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </span>
        ) : (
          'Add Task'
        )}
      </button>
    </form>
  );
};

export default TodoInput;
