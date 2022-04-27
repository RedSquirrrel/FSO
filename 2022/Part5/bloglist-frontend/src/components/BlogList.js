import { useRef } from 'react';

import Blog from './Blog';
import blogsServices from '../services/blogs';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const BlogList = ({ blogs, user, setUser, setBlogs, setNotification }) => {
  const blogFormRef = useRef();

  const logOut = () => {
    window.localStorage.removeItem('blogUser');
    setUser(null);
    blogsServices.setToken(null);
  };

  const addBlog = async blogObj => {
    blogFormRef.current.toggleVisibility();

    try {
      blogsServices.setToken(user.token);

      const returnedObj = await blogsServices.create(blogObj);
      setBlogs(blogs.concat(returnedObj));
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

  const updateLike = async id => {
    const findBlog = blogs.find(b => b.id === id);
    try {
      const changedBlog = { ...findBlog, likes: findBlog.likes + 1 };
      await blogsServices.update(id, changedBlog);
      setBlogs(blogs.map(blog => (blog.id !== id ? blog : { ...changedBlog })));
    } catch (error) {
      setNotification({ type: 'error', message: error.response.data.error });
      setTimeout(() => {
        setNotification(null);
      }, 2000);
      setBlogs(blogs.filter(b => b.id !== id));
    }
  };

  const removeBlog = async id => {
    blogsServices.setToken(user.token);

    const findBlog = blogs.find(b => b.id === id);
    try {
      if (window.confirm(`Remove blog "${findBlog.title}" by "${findBlog.author}"?`)) {
        await blogsServices.removeBlogFromDb(id);
        setBlogs(blogs.filter(blog => blog.id !== id));
        setNotification({ type: 'success', message: `Successfully removed "${findBlog.title}" by "${findBlog.author}"` });
        setTimeout(() => {
          setNotification(null);
        }, 2000);
      }
    } catch (error) {
      setNotification({ type: 'error', message: ` ${error.response.data.error}, "${findBlog.title}" by "${findBlog.author}"` });
      setTimeout(() => {
        setNotification(null);
      }, 2000);
      setBlogs(blogs.filter(b => b.id !== id));
    }
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
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLike={() => updateLike(blog.id)}
          blogs={blogs}
          user={user}
          removeBlog={() => removeBlog(blog.id)}
        />
      ))}
    </div>
  );
};

export default BlogList;
