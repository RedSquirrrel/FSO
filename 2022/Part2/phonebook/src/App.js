import { useEffect, useState } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showFiltered, setShowFiltered] = useState('');
  const [showResult, setShowResult] = useState(persons);

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      console.log(response.data);

      setPersons(response.data);
      setShowResult(response.data);
    });
    console.log('Persons', persons);
  }, []);

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

