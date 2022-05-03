import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async content => {
  const obj = { content, votes: 0 };
  const response = await axios.post(baseUrl, obj);
  return response.data;
};

const update = async anec => {
  const newA = { ...anec, votes: anec.votes + 1 };
  const response = await axios.put(`${baseUrl}/${anec.id}`, newA);
  return response.data;
};

const services = { getAll, createNew, update };

export default services;
