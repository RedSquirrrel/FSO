import { useState } from 'react';

const Blog = ({ blog, updateLike, user, removeBlog }) => {
  const [visible, setVisible] = useState(false);
  const label = !visible ? 'View' : 'Hide';

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
            <button className='like-btn' onClick={updateLike}>
              Like
            </button>
          </div>
          <div>
            {blog.user.username === user.username ? (
              <button className='remove_btn' onClick={removeBlog}>
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
