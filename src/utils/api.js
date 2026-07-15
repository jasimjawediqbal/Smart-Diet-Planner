import axios from 'axios';

// Centralized Axios instance for all API calls
const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 8000,
});

// Load the saved diet planner state from the server
export const loadState = () => api.get('/state');

// Save the current diet planner state to the server
export const saveState = (state) => api.post('/state', state);

export default api;
