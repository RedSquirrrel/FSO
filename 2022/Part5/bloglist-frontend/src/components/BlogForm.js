import { useState } from 'react';

import blogsServices from '../services/blogs';

const BlogForm = ({ blogs, setBlog, user, setNotification }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = async e => {
    e.preventDefault();

    try {
      blogsServices.setToken(user.token);
      const blogObject = {
        title,
        author,
        url,
      };

      const returnedObj = await blogsServices.create(blogObject);
      console.log(returnedObj);
      setBlog(blogs.concat(returnedObj));
      setTitle('');
      setAuthor('');
      setUrl('');
      setNotification({ type: 'success', message: `A new blog "${returnedObj.title}" by ${returnedObj.author} added` });
      setTimeout(() => {
        setNotification(null);
      }, 2000);
    } catch (error) {
      setNotification({ type: 'error', message: error.response.data.error });
      setTimeout(() => {
        setNotification(null);
      }, 2000);
    }
  };

  return (
    <form onSubmit={addBlog}>
      <h2>Create New</h2>
      <div>
        Title:
        <input type='text' value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        Author:
        <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        Url:
        <input type='text' value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type='submit'>Create</button>
    </form>
  );
};

export default BlogForm;
