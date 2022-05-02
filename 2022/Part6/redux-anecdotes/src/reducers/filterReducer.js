import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterAnecdotes(state, action) {
      const id = action.payload;
      return id;
    },
  },
});

export const { filterAnecdotes } = filterSlice.actions;

export default filterSlice.reducer;
