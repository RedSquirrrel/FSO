import { createSlice } from '@reduxjs/toolkit';
import blogServices from '../services/blogs';
import { showNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    initializeBlogs(state, action) {
      return action.payload;
    },
    addNew(state, action) {
      state.push(action.payload);
    },
    delBlog(state, action) {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    addLike(state, action) {
      const id = action.payload.id;
      const changedBlog = action.payload;
      return state.map((blog) => (blog.id !== id ? blog : { ...changedBlog }));
    },
  },
});

export const { initializeBlogs, addNew, delBlog, addLike } = blogSlice.actions;

export const getAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    dispatch(initializeBlogs(blogs));
  };
};

export const createNewBlog = (blogObj) => {
  return async (dispatch) => {
    try {
      // blogServices.setToken(user.token);

      const returnedObj = await blogServices.create(blogObj);
      dispatch(addNew(returnedObj));
      dispatch(showNotification('success', `A new blog "${returnedObj.title}" by ${returnedObj.author} added`, 5));
    } catch (error) {
      dispatch(showNotification('error', error.response.data.error, 5));
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogServices.removeBlogFromDb(blog.id);
      dispatch(delBlog(blog.id));
      dispatch(showNotification('success', `Successfully removed "${blog.title}" by "${blog.author}"`, 5));
    } catch (error) {
      dispatch(showNotification('error', ` ${error.response.data.error} "${blog.title}" by "${blog.author}"`, 5));
      dispatch(delBlog(blog.id));
    }
  };
};

export const updateBlog = (id, blObj) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogServices.update(id, blObj);
      dispatch(addLike(updatedBlog));
    } catch (error) {
      dispatch(showNotification('error', error.response.data.error));
    }
  };
};

export default blogSlice.reducer;
