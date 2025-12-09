// src/utils/api.js
// Axios instance and API functions for Todo operations

import axios from 'axios';

// Get API URL from environment variable (for production/development flexibility)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

/**
 * Fetch all todos
 * @returns {Promise<Array>} - Array of todo objects
 */
export const fetchTodos = async () => {
  try {
    const response = await api.get('/todos');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

/**
 * Create a new todo
 * @param {string} title - Todo title
 * @returns {Promise<Object>} - Created todo object
 */
export const createTodo = async (title) => {
  try {
    const response = await api.post('/todos', { title });
    return response.data;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

/**
 * Update a todo
 * @param {string} id - Todo ID
 * @param {Object} updates - Updates object {title?, completed?}
 * @returns {Promise<Object>} - Updated todo object
 */
export const updateTodo = async (id, updates) => {
  try {
    const response = await api.put(`/todos/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

/**
 * Delete a todo
 * @param {string} id - Todo ID
 * @returns {Promise<Object>} - Delete response
 */
export const deleteTodo = async (id) => {
  try {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

export default api;
