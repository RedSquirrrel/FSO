import { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

import { getAllBlogs } from './reducers/blogReducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blogUser');
    if (loggedUser) {
      const parseUser = JSON.parse(loggedUser);
      setUser(parseUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  return (
    <div>
      <Notification />
      {user === null ? <LoginForm user={user} setUser={setUser} /> : <BlogList user={user} setUser={setUser} />}
    </div>
  );
};

export default App;
