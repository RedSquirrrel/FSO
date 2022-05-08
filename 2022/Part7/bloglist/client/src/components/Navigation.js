import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOutUser } from '../reducers/authReducer';

const Navigation = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.authUser);

  if (!loggedInUser) return;

  const logOut = () => {
    dispatch(logOutUser());
  };

  return (
    <ul>
      <Link to='/'>
        <li>Blogs</li>
      </Link>
      <Link to='/users'>
        <li>Users</li>
      </Link>
      <li>
        <span>
          <em style={{ color: 'limegreen' }}>{loggedInUser.name}</em> logged in
          <button onClick={logOut}>LogOut</button>
        </span>
      </li>
    </ul>
  );
};

export default Navigation;
