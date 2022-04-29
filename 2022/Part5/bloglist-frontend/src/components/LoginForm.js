import { useState } from 'react';

import loginServices from '../services/login';
import blogsServices from '../services/blogs';

const LoginForm = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const result = await loginServices.login({ username, password });
      window.localStorage.setItem('blogUser', JSON.stringify(result));
      blogsServices.setToken(result.token);
      setUser(result);
      setUsername('');
      setPassword('');
      setNotification({ type: 'success', message: `Welcome ${result.name}` });
      setTimeout(() => {
        setNotification({ type: '', message: '' });
      }, 2000);
    } catch (error) {
      setNotification({ type: 'error', message: 'Wrong username or password' });
      setTimeout(() => {
        setNotification(null);
      }, 2000);
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className='mg'>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          Username <input id='username' type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          Password
          <input id='password' type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button id='login-btn' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
