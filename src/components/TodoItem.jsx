// src/components/TodoItem.jsx
// Individual todo item component with edit, delete, and toggle complete

import { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isUpdating, setIsUpdating] = useState(false);

  // Handle toggle completed status
  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      await onUpdate(todo._id, { completed: !todo.completed });
    } catch (error) {
      console.error('Failed to update todo:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle edit save
  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      return;
    }

    setIsUpdating(true);
    try {
      await onUpdate(todo._id, { title: editTitle.trim() });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update todo:', error);
      setEditTitle(todo.title); // Reset on error
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  // Handle delete
  const handleDelete = async () => {
    setIsUpdating(true);
    try {
      await onDelete(todo._id);
    } catch (error) {
      console.error('Failed to delete todo:', error);
      setIsUpdating(false);
    }
  };

  return (
    <div className="group flex items-center gap-4 p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-200 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10">
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
        disabled={isUpdating}
        className="w-6 h-6 text-purple-600 bg-white/10 border-purple-500/30 rounded-lg focus:ring-2 focus:ring-purple-500/50 cursor-pointer disabled:cursor-not-allowed transition-all"
        aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />

      {/* Todo content */}
      {isEditing ? (
        // Edit mode
        <div className="flex-1 flex gap-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveEdit();
              if (e.key === 'Escape') handleCancelEdit();
            }}
            className="flex-1 px-4 py-2 border-2 border-purple-500 rounded-lg bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            disabled={isUpdating}
            autoFocus
            aria-label="Edit todo title"
          />
          <button
            onClick={handleSaveEdit}
            disabled={isUpdating || !editTitle.trim()}
            className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-500 disabled:to-gray-600 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md"
            aria-label="Save changes"
          >
            Save
          </button>
          <button
            onClick={handleCancelEdit}
            disabled={isUpdating}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 text-gray-300 text-sm font-medium rounded-lg transition-all duration-200"
            aria-label="Cancel editing"
          >
            Cancel
          </button>
        </div>
      ) : (
        // Display mode
        <>
          <span
            className={`flex-1 text-lg font-medium ${
              todo.completed
                ? 'line-through text-gray-500'
                : 'text-gray-100'
            } transition-all duration-200`}
          >
            {todo.title}
          </span>

          {/* Action buttons */}
          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => setIsEditing(true)}
              disabled={isUpdating || todo.completed}
              className="px-4 py-2 text-sm font-medium text-purple-400 hover:bg-purple-500/20 rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1"
              aria-label="Edit todo"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isUpdating}
              className="px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              aria-label="Delete todo"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoItem;
