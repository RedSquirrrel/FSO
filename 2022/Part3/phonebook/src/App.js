import { useEffect, useState } from 'react';

import Filter from './components/Filter';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import personService from './services/person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [showFiltered, setShowFiltered] = useState('');
  const [showResult, setShowResult] = useState(persons);
  const [notification, setNotification] = useState({ type: '', text: '' });

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons);
      setShowResult(initialPersons);
    });
  }, []);

  const addPersons = e => {
    e.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
    };

    if (newPerson.name === '' && newPerson.number === '') return;

    const handleCheck = persons.filter(person => person.name.toLowerCase() === newName.toLowerCase());
    console.log(handleCheck);

    if (handleCheck.length) {
      const person = persons.find(i => i.id === handleCheck[0].id);
      const changedObj = { ...person, number: newPerson.number };

      if (window.confirm(` ${newPerson.name} is already added to phonebook, replace the old number with a new one? `)) {
        personService
          .updateEntries(person.id, changedObj)
          .then(returnedObj => {
            setShowResult(persons.map(pers => (pers.id !== person.id ? pers : returnedObj)));
            setNotification({
              type: 'success',
              text: `Successfuly updated for ${newPerson.name} with the new number ${newPerson.number}`,
            });
            setTimeout(() => {
              setNotification({ type: null, text: null });
            }, 5000);
          })
          .catch(error => {
            console.log(error);
            setNotification({
              type: 'error',
              text: ` Information of ${newPerson.name} has already been removed from the server`,
            });
            setTimeout(() => {
              setNotification({ type: null, text: null });
            }, 5000);
            setShowResult(persons.filter(p => p.id !== person.id));
          });
        setNewName('');
        setNewNumber('');
      }
    } else {
      personService
        .create(newPerson)
        .then(returnedNewPers => {
          setPersons(persons.concat(returnedNewPers));
          setShowResult(persons.concat(returnedNewPers));

          setNotification({ type: 'success', text: `Added ${newPerson.name}` });
          setTimeout(() => {
            setNotification({ type: null, text: null });
          }, 5000);
        })
        .catch(error => {
          setNotification({ type: 'error', text: error.response.data.error });
          setTimeout(() => {
            setNotification({ type: null, text: null });
          }, 5000);
        });
      setNewName('');
      setNewNumber('');
    }
  };

  const deletePerson = id => {
    const person = persons.find(p => p.id === id);

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deleteEntries(id)
        .then(() => {
          setShowResult(showResult.filter(p => p.id !== id));
        })
        .catch(error => {
          setNotification({ type: 'error', text: `${person.name} has already been removed from the server` });
          setTimeout(() => {
            setNotification({ type: null, text: null });
          }, 5000);
          setShowResult(showResult.filter(p => p.id !== id));
        });
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
      <Notification message={notification} />
      <Filter showFiltered={showFiltered} handleFilter={handleFilter} />
      <h3>Add a new:</h3>
      <PersonForm addPersons={addPersons} newName={newName} handlePerson={handlePerson} newNumber={newNumber} handleNumber={handleNumber} />
      <h3>Numbers</h3>
      <Persons showResult={showResult} deletePerson={deletePerson} />
    </div>
  );
};

export default App;

