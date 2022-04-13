const PersonForm = ({ addPersons, newName, handlePerson, newNumber, handleNumber }) => {
  return (
    <form onSubmit={addPersons}>
      <div>
        Name: <input value={newName} onChange={handlePerson} />
      </div>
      <div>
        Nunber: <input value={newNumber} onChange={handleNumber} />
      </div>
      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  );
};

export default PersonForm;
