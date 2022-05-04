import { createSlice } from '@reduxjs/toolkit';
import services from '../services/anecdotes';
import { setNotification } from './notificationReducer';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action) {
      state.push(action.payload);
    },
    voting(state, action) {
      const id = action.payload.id;
      const findV = state.find(i => i.id === id);
      const newObj = { ...findV, votes: findV.votes + 1 };
      return state.map(a => (a.id !== id ? a : newObj)).sort((a, b) => b.votes - a.votes);
    },
    getAllAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { newAnecdote, voting, getAllAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await services.getAll();
    dispatch(getAllAnecdotes(anecdotes));
  };
};

export const addNewAnecdote = content => {
  return async dispatch => {
    const newAnec = await services.createNew(content);
    dispatch(newAnecdote(newAnec));
  };
};

export const updateVote = anec => {
  return async dispatch => {
    const updated = await services.update(anec);
    dispatch(voting(updated));
    dispatch(setNotification(`You voted: "${anec.content}"`, 5));
  };
};

export default anecdoteSlice.reducer;
