import axios from 'axios';
const baseUrl = '/api/login';

const login = async (loginData) => {
  const response = await axios.post(baseUrl, loginData);
  return response.data;
};

const loginServices = { login };
export default loginServices;
