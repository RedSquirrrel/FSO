import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
    <div style={{ width: '500px' }}>
      <Typography align='center'>Log in to application</Typography>
      <form onSubmit={handleLogin}>
        <div>
          <TextField sx={{ mb: 3 }} label='Username' variant='standard' type='text' name='username' fullWidth />
        </div>
        <div>
          <TextField sx={{ mb: 3 }} label='Passwors' variant='standard' type='password' name='password' fullWidth />
        </div>
        <div>
          <Button sx={{ py: 1 }} variant='outlined' type='submit' fullWidth>
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
