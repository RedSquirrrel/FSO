import { useState } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showFiltered, setShowFiltered] = useState('');
  const [showResult, setShowResult] = useState(persons);

  const addPersons = e => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (newPerson.name === '' && newPerson.number === '') return;

    const handleCheck = persons.filter(person => person.name === newName);

    if (handleCheck.length) {
      alert(`${newName} is already added to phonebook`);
      setNewName('');
      setNewNumber('');
    } else {
      const concatedPers = persons.concat(newPerson);
      setPersons(concatedPers);
      setShowResult(concatedPers);
      setNewName('');
      setNewNumber('');
    }
  };

  const handlePerson = e => {
    setNewName(e.target.value);
  };

  const handleNumber = e => {
    setNewNumber(e.target.value);
  };

  const handleFilter = e => {
    const filtered = persons.filter(p => {
      setShowFiltered(e.target.value);
      return p.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setShowResult(filtered);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showFiltered={showFiltered} handleFilter={handleFilter} />
      <h3>Add a new:</h3>
      <PersonForm addPersons={addPersons} newName={newName} handlePerson={handlePerson} newNumber={newNumber} handleNumber={handleNumber} />
      <h3>Numbers</h3>
      <Persons showResult={showResult} />
    </div>
  );
};

export default App;

