import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action) {
      state.push(action.payload);
    },
    voting(state, action) {
      const id = action.payload;
      const filterd = state.find(i => i.id === id);
      const newObj = { ...filterd, votes: filterd.votes + 1 };
      return state.map(a => (a.id !== id ? a : newObj)).sort((a, b) => b.votes - a.votes);
    },
    getAllAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { newAnecdote, voting, getAllAnecdotes } = anecdoteSlice.actions;

export default anecdoteSlice.reducer;
