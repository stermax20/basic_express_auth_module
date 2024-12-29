import axiosInstance from './axiosInstance';

export const login = async (username, password) => {
  const response = await axiosInstance.post('/auth/signin', { username, password });
  return response.data;
};

export const register = async (username, password) => {
  const response = await axiosInstance.post('/auth/signup', { username, password });
  return response.data;
};
