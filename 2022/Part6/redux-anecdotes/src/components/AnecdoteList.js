import { useSelector, useDispatch } from 'react-redux';

import { voting } from '../reducers/anecdoteReducer';

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={vote}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state);

  const vote = id => {
    dispatch(voting(id));
  };

  return (
    <div>
      {anecdotes.map(anecdote => {
        return <Anecdote key={anecdote.id} anecdote={anecdote} vote={() => vote(anecdote.id)} />;
      })}
    </div>
  );
};

export default AnecdoteList;
