import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from '../reducers/authReducer';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const Navigation = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.authUser);

  if (!loggedInUser) return;

  const logOut = () => {
    dispatch(logOutUser());
  };

  return (
    <AppBar position='static'>
      <ul className='nav'>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link to='/'>
            <li>BLOGS</li>
          </Link>
          <Link to='/users'>
            <li>USERS</li>
          </Link>
        </Toolbar>
        <li>
          <span>
            <em style={{ color: 'limegreen' }}>{loggedInUser.name}</em> logged in
            <button onClick={logOut}>LogOut</button>
          </span>
        </li>
      </ul>
    </AppBar>
  );
};

export default Navigation;
