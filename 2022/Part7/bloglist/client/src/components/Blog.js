import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteBlog, updateBlog, newComment } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogs = useSelector((state) => state.blogs);
  const loggedInUser = useSelector((state) => state.authUser);

  if (!blog) return;

  const blogStyle = {
    paddingTop: 10,
    padding: 10,
    border: '1px solid dodgerblue',
    marginBottom: 5,
    marginTop: 15,
  };

  const removeBlog = async (id) => {
    const findBlog = blogs.find((b) => b.id === id);
    if (window.confirm(`Remove blog "${blog.title}" by "${blog.author}"?`)) {
      dispatch(deleteBlog(findBlog));
      navigate('/');
    }
  };

  const updateLike = async (id, blogLike) => {
    const newBlog = { ...blogLike, likes: blogLike.likes + 1 };
    dispatch(updateBlog(id, newBlog));
  };

  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    dispatch(newComment(blog.id, blog, comment));
  };

  return (
    <div id='blogs' style={blogStyle}>
      <h1>
        {blog.title} by {blog.author}
      </h1>
      <div>Url: {blog.url}</div>
      <div>
        Likes: {blog.likes}
        <button className='like-btn' onClick={() => updateLike(blog.id, blog)}>
          Like
        </button>
      </div>
      <div>Added by: {blog.user.username}</div>
      <div>
        {blog.user.username === loggedInUser.username ? (
          <button className='remove_btn' onClick={() => removeBlog(blog.id)}>
            Remove
          </button>
        ) : null}
      </div>
      <div>
        <h3>Comments</h3>
        <form onSubmit={handleComment}>
          <input type='text' name='comment' />
          <button>Add a comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
