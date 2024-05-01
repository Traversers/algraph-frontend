import axios from 'axios';
import { BACKEND_URL } from '../constants/constants';

export const login = async (email, password) => {
  const response = await axios.post(`${BACKEND_URL}/login`, {
    email,
    password,
  });
  console.log(`response`, response.data);
  return response.data;
};
