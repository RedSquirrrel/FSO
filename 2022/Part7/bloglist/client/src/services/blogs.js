import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, updatedObj) => {
  const blog = {
    title: updatedObj.title,
    author: updatedObj.author,
    url: updatedObj.url,
    likes: updatedObj.likes,
  };
  const response = await axios.put(`${baseUrl}/${id}`, blog);
  console.log('RESPONSE', response.data);
  return response.data;
};

const removeBlogFromDb = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

const createComment = async (id, blog, comment) => {
  const obj = { id, blog, comments: comment };
  const response = await axios.post(`${baseUrl}/${id}/comments`, obj);
  return response.data;
};

const services = { getAll, setToken, create, update, removeBlogFromDb, createComment };
export default services;
