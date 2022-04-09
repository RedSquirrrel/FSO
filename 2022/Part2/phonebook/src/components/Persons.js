import Person from './Person';

const Persons = ({ showResult, deletePerson }) => {
  return (
    <div>
      {showResult.map(p => {
        return (
          <p key={p.name}>
            <Person name={p.name} number={p.number} />
            <button onClick={() => deletePerson(p.id)}>Delete</button>
          </p>
        );
      })}
    </div>
  );
};

export default Persons;
