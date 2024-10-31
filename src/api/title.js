import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1';

export const getTitles = (token) => {
  return axios.get(`${API_URL}/title`, {
    headers: { Authorization: token },
  });
};

export const addTitle = (title, token) => {
  return axios.post(`${API_URL}/title`, title, {
    headers: { Authorization: token },
  });
};

export const deleteTitle = (id, token) => {
  return axios.delete(`${API_URL}/title/${id}`, {
    headers: { Authorization: token },
  });
};
