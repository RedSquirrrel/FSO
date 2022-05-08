import { configureStore } from '@reduxjs/toolkit';
import blogReducer from '../reducers/blogReducer';
import notificationReducer from '../reducers/notificationReducer';
import userReducer from '../reducers/userReducer';
import authReducer from '../reducers/authReducer';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    users: userReducer,
    authUser: authReducer,
  },
});

console.log(store.getState());
export default store;
