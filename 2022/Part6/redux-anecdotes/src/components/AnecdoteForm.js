import { useDispatch } from 'react-redux';

import { newAnecdote } from '../reducers/anecdoteReducer';
import services from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnec = async e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    const newAnec = await services.createNew(content);
    dispatch(newAnecdote(newAnec));
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
