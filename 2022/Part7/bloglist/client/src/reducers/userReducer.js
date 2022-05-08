import { createSlice } from '@reduxjs/toolkit';
import userServices from '../services/users';

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    getAllUs(state, action) {
      return action.payload;
    },
  },
});

export const { getAllUs } = userSlice.actions;

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userServices.getAllUsers();
    dispatch(getAllUs(users));
  };
};

export default userSlice.reducer;
