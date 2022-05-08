import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useMatch } from 'react-router-dom';

import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

import { getAllBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import { initializeAuthUser } from './reducers/authReducer';
import Users from './components/Users';
import User from './components/User';
import Navigation from './components/Navigation';

const App = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.authUser);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllBlogs());
    dispatch(initializeUsers());
    dispatch(initializeAuthUser());
  }, [dispatch]);

  const matchUser = useMatch('/users/:id');
  const user = matchUser ? users.find((user) => user.id === matchUser.params.id) : null;

  return (
    <div>
      <Notification />
      <Navigation />
      <Routes>
        <Route path='/users/:id' element={<User user={user} />} />
        <Route path='/users' element={<Users />} />
        <Route path='/' element={loggedInUser === null ? <LoginForm /> : <BlogList />} />
      </Routes>
    </div>
  );
};

export default App;
