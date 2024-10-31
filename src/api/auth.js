import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response;
};

export const register = (userInfo) => {
  return axios.post(`${API_URL}/auth/register`, userInfo);
};
