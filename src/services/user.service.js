import axios from 'axios';
import { BACKEND_LOGIN_URL } from '../constants/constants';
import allowCorsForAxios from '../utils/allowCorsForAxios';

export const login = async (email, password) => {
  allowCorsForAxios(axios);
  const response = await axios.post(`${BACKEND_LOGIN_URL}`, {
    email,
    password,
  });
  console.log(`response`, response.data);
  return response.data;
};
