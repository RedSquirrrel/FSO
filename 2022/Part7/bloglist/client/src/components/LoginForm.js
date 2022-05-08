import { useDispatch } from 'react-redux';

import { logInUser } from '../reducers/authReducer';

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    dispatch(logInUser({ username, password }));
  };

  return (
    <div>
      <h1 className='mg'>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          Username <input id='username' type='text' name='username' />
        </div>
        <div>
          Password
          <input id='password' type='password' name='password' />
        </div>
        <button id='login-btn' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
