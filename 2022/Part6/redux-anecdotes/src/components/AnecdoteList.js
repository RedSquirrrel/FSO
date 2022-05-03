import { useSelector, useDispatch } from 'react-redux';

import { updateVote } from '../reducers/anecdoteReducer';

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
  const anecdotes = useSelector(({ anecdotes, filtered }) => {
    if (filtered === '') {
      return anecdotes;
    }

    return filtered ? anecdotes.filter(a => a.content.toLowerCase().includes(filtered)) : '';
  });

  const vote = anec => {
    dispatch(updateVote(anec));
  };

  return (
    <div>
      {anecdotes.map(anecdote => {
        return <Anecdote key={anecdote.id} anecdote={anecdote} vote={() => vote(anecdote)} />;
      })}
    </div>
  );
};

export default AnecdoteList;
