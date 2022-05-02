import { useSelector, useDispatch } from 'react-redux';

import { voting } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

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

  const vote = (id, content) => {
    dispatch(voting(id));
    dispatch(showNotification(`You voted: "${content}"`));

    setTimeout(() => {
      dispatch(showNotification(''));
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map(anecdote => {
        return <Anecdote key={anecdote.id} anecdote={anecdote} vote={() => vote(anecdote.id, anecdote.content)} />;
      })}
    </div>
  );
};

export default AnecdoteList;
