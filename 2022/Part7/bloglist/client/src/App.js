import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useMatch } from 'react-router-dom';

import Notification from './components/Notification';
import Navigation from './components/Navigation';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import Blog from './components/Blog';
import Users from './components/Users';
import User from './components/User';

import { getAllBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import { initializeAuthUser } from './reducers/authReducer';

const App = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.authUser);
  const users = useSelector((state) => state.users);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(initializeUsers());
    dispatch(initializeAuthUser());
  }, [dispatch]);

  const matchUser = useMatch('/users/:id');
  const user = matchUser ? users.find((user) => user.id === matchUser.params.id) : null;

  const matchBlog = useMatch('/blogs/:id');
  const blog = matchBlog ? blogs.find((blog) => blog.id === matchBlog.params.id) : null;

  return (
    <div>
      <Notification />
      <Navigation />
      <Routes>
        <Route path='/users/:id' element={<User user={user} />} />
        <Route path='/blogs/:id' element={<Blog blog={blog} />} />
        <Route path='/users' element={<Users />} />
        <Route path='/' element={loggedInUser === null ? <LoginForm /> : <BlogList />} />
      </Routes>
    </div>
  );
};

export default App;
