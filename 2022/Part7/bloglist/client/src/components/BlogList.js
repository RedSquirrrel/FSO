import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import BlogForm from './BlogForm';
import Togglable from './Togglable';

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.users);

  const blogFormRef = useRef();
  const sortedBlog = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2 className='mg'>Blogs</h2>
      <Togglable buttonLabel='Create New Blog' ref={blogFormRef}>
        <BlogForm user={user} />
      </Togglable>
      {sortedBlog.map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
