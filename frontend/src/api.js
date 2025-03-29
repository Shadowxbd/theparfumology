// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true
});

export const registerUser = (formData) => API.post('/signup', formData);
export const loginUser = (formData) => API.post('/login', formData);
export const getUserProfile = () => API.get('/profile');
