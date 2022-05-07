import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteBlog, updateBlog } from '../reducers/blogReducer';
import blogsServices from '../services/blogs';

const Blog = ({ blog, user }) => {
  const [visible, setVisible] = useState(false);
  const label = !visible ? 'View' : 'Hide';
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const blogStyle = {
    paddingTop: 10,
    padding: 10,
    border: '1px solid dodgerblue',
    marginBottom: 5,
    marginTop: 15,
  };

  const toggle = () => {
    setVisible(!visible);
  };

  const removeBlog = async (id) => {
    blogsServices.setToken(user.token);

    const findBlog = blogs.find((b) => b.id === id);
    if (window.confirm(`Remove blog "${blog.title}" by "${blog.author}"?`)) {
      dispatch(deleteBlog(findBlog));
    }
  };

  const updateLike = async (id, blogLike) => {
    const newBlog = { ...blogLike, likes: blogLike.likes + 1 };
    dispatch(updateBlog(id, newBlog));
  };

  return (
    <div id='blogs' style={blogStyle}>
      <div className='flex'>
        {blog.title} by {blog.author}
        <button id='view-btn' onClick={toggle}>
          {label}
        </button>
      </div>
      {visible ? (
        <div>
          <div>Url: {blog.url}</div>
          <div>
            Likes: {blog.likes}
            <button className='like-btn' onClick={() => updateLike(blog.id, blog)}>
              Like
            </button>
          </div>
          <div>
            {blog.user.username === user.username ? (
              <button className='remove_btn' onClick={() => removeBlog(blog.id)}>
                Remove
              </button>
            ) : null}
          </div>
          <div>{blog.user.username}</div>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
