import { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = e => {
    e.preventDefault();
    createBlog({
      title,
      author,
      url,
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  };

  return (
    <form onSubmit={addBlog}>
      <h2>Create New</h2>
      <div>
        Title:
        <input id='title' type='text' value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        Author:
        <input id='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        Url:
        <input id='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button id='create-btn' type='submit'>
        Create
      </button>
    </form>
  );
};

export default BlogForm;
