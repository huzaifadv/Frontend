// src/components/TodoList.jsx
// List component that renders all todo items

import TodoItem from './TodoItem';

const TodoList = ({ todos, onUpdate, onDelete, isLoading }) => {
  // Show loading state
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center gap-3 text-gray-300">
          <svg className="animate-spin h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg font-medium">Loading your tasks...</span>
        </div>
      </div>
    );
  }

  // Show empty state
  if (todos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-6 flex justify-center">
          <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-20 h-20 text-purple-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-200 mb-2">No tasks yet!</h3>
        <p className="text-gray-400 text-lg">
          Start by adding your first task above
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3" role="list" aria-label="Todo list">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
