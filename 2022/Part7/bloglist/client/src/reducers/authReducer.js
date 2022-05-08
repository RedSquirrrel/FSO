import { createSlice } from '@reduxjs/toolkit';
import loginServices from '../services/login';
import blogServices from '../services/blogs';
import { showNotification } from './notificationReducer';

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    logIn(state, action) {
      return action.payload;
    },
    logOut(stat, action) {
      return action.payload;
    },
    getAuthUser(state, action) {
      return action.payload;
    },
  },
});

export const { logIn, logOut, getAuthUser } = authSlice.actions;

export const logInUser = (username, password) => {
  return async (dispatch) => {
    try {
      const result = await loginServices.login(username, password);
      window.localStorage.setItem('blogUser', JSON.stringify(result));
      blogServices.setToken(result.token);
      dispatch(logIn(result));
      dispatch(showNotification('success', `Welcome ${result.name}`, 5));
    } catch (error) {
      console.log(error);
      dispatch(showNotification('error', 'Wrong username or password', 5));
    }
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    localStorage.removeItem('blogUser');
    dispatch(logOut(null));
    blogServices.setToken(null);
  };
};

export const initializeAuthUser = () => {
  return async (dispatch) => {
    const loggedUser = JSON.parse(localStorage.getItem('blogUser'));
    if (loggedUser) {
      dispatch(getAuthUser(loggedUser));
      blogServices.setToken(loggedUser.token);
    }
  };
};

export default authSlice.reducer;
