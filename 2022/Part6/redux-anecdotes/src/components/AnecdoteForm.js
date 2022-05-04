import { connect } from 'react-redux';
import { addNewAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = props => {
  const addNewAnec = async e => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    props.addNewAnecdote(content);
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

export default connect(null, { addNewAnecdote })(AnecdoteForm);
