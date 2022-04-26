import { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ type: '', message: '' });

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

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
      <Notification notification={notification} />

      {user === null ? (
        <LoginForm user={user} setUser={setUser} setNotification={setNotification} />
      ) : (
        <BlogList blogs={blogs} user={user} setUser={setUser} setBlogs={setBlogs} setNotification={setNotification} />
      )}
    </div>
  );
};

export default App;
