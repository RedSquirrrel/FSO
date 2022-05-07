import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notif',
  initialState: '',
  reducers: {
    addNotification(state, actions) {
      return actions.payload;
    },
  },
});

export const { addNotification } = notificationSlice.actions;

export const showNotification = (type, text, time) => {
  return async dispatch => {
    dispatch(addNotification({ type, text }));
    setTimeout(() => {
      dispatch(addNotification(null));
    }, time * 1000);
  };
};

export default notificationSlice.reducer;
