import Person from './Person';

const Persons = ({ showResult }) => {
  return (
    <div>
      {showResult.map(p => {
        return (
          <p key={p.name}>
            <Person name={p.name} number={p.number} />
          </p>
        );
      })}
    </div>
  );
};

export default Persons;
