// src/utils/authHelpers.js
export const getTokenFromLocalStorage = () => localStorage.getItem('token');
export const saveTokenToLocalStorage = (token) => localStorage.setItem('token', token);
export const removeTokenFromLocalStorage = () => localStorage.removeItem('token');
