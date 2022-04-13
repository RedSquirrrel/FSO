import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = newObj => {
  const request = axios.post(baseUrl, newObj);
  return request.then(response => response.data);
};

const updateEntries = (id, newObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newObj);
  return request.then(response => response.data);
};

const deleteEntries = id => {
  return axios.delete(`${baseUrl}/${id}`);
};

const services = { getAll, create, deleteEntries, updateEntries };
export default services;
