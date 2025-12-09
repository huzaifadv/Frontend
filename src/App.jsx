// src/App.jsx
// Main application component

import { useState, useEffect } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './utils/api';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set dark theme permanently on mount
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Fetch todos on mount
  useEffect(() => {
    loadTodos();
  }, []);

  // Load all todos from API
  const loadTodos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTodos();
      setTodos(data);
    } catch (err) {
      setError('Failed to load todos. Make sure the backend is running.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add new todo
  const handleAddTodo = async (title) => {
    try {
      const newTodo = await createTodo(title);
      setTodos([newTodo, ...todos]); // Add to beginning of list
      setError(null);
    } catch (err) {
      setError('Failed to add todo');
      throw err;
    }
  };

  // Update existing todo
  const handleUpdateTodo = async (id, updates) => {
    try {
      const updatedTodo = await updateTodo(id, updates);
      setTodos(todos.map((todo) => (todo._id === id ? updatedTodo : todo)));
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
      throw err;
    }
  };

  // Delete todo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((todo) => todo._id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
      throw err;
    }
  };

  // Calculate remaining (incomplete) todos
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header with gradient */}
        <div className="mb-10 text-center">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-4 tracking-tight">
            My Tasks
          </h1>
          <div className="flex items-center justify-center gap-3 text-gray-300">
            <div className="flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20">
              <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="font-semibold">{remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} remaining</span>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-300 rounded-xl backdrop-blur-sm animate-pulse">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Todo input */}
        <div className="mb-8">
          <TodoInput onAdd={handleAddTodo} />
        </div>

        {/* Todo list with glass effect */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8">
          <TodoList
            todos={todos}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodo}
            isLoading={isLoading}
          />
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 text-sm">
            Built with <span className="text-purple-400 font-semibold">MERN Stack</span> + <span className="text-pink-400 font-semibold">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
