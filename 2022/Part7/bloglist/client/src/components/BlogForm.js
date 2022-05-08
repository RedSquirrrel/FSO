import { useDispatch, useSelector } from 'react-redux';

import { createNewBlog } from '../reducers/blogReducer';
import blogServices from '../services/blogs';

const BlogForm = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.authUser);

  const addBlog = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const url = e.target.url.value;

    blogServices.setToken(loggedInUser.token);
    dispatch(createNewBlog({ title, author, url }));

    e.target.title.value = '';
    e.target.author.value = '';
    e.target.url.value = '';
  };

  return (
    <form onSubmit={addBlog}>
      <h2>Create New</h2>
      <div>
        Title:
        <input id='title' type='text' name='title' />
      </div>
      <div>
        Author:
        <input id='author' type='text' name='author' />
      </div>
      <div>
        Url:
        <input id='url' type='text' name='url' />
      </div>
      <button id='create-btn' type='submit'>
        Create
      </button>
    </form>
  );
};

export default BlogForm;
