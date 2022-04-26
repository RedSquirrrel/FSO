import Blog from './Blog';
import blogsServices from '../services/blogs';
import BlogForm from './BlogForm';

const BlogList = ({ blogs, user, setUser, setBlogs, setNotification }) => {
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
      <BlogForm blogs={blogs} setBlog={setBlogs} user={user} setNotification={setNotification} />
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
