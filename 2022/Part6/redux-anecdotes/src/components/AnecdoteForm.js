import { useDispatch } from 'react-redux';

import { newAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnec = e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    dispatch(newAnecdote(content));
    e.target.anecdote.value = '';
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnec}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
