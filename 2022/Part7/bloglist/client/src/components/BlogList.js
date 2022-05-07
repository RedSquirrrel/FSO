import { useRef } from 'react';
import { useSelector } from 'react-redux';

import Blog from './Blog';
import blogsServices from '../services/blogs';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const BlogList = ({ user, setUser }) => {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();

  const sortedBlog = [...blogs].sort((a, b) => b.likes - a.likes);

  const logOut = () => {
    window.localStorage.removeItem('blogUser');
    setUser(null);
    blogsServices.setToken(null);
  };

  return (
    <div>
      <h2 className='mg'>blogs</h2>
      <h3>
        <span>
          <em style={{ color: 'limegreen' }}>{user.name}</em> logged in
          <button onClick={logOut}>LogOut</button>
        </span>
      </h3>
      <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
        <BlogForm user={user} />
      </Togglable>
      {sortedBlog.map((blog) => (
        <Blog key={blog.id} blog={blog} user={user} />
      ))}
    </div>
  );
};

export default BlogList;
