import { useDispatch } from 'react-redux';
import { createNewBlog } from '../reducers/blogReducer';
import blogsServices from '../services/blogs';

const BlogForm = ({ user }) => {
  const dispatch = useDispatch();

  const addBlog = e => {
    e.preventDefault();
    const title = e.target.title.value;
    const author = e.target.author.value;
    const url = e.target.url.value;
    blogsServices.setToken(user.token);
    dispatch(createNewBlog({ title, author, url }));
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
