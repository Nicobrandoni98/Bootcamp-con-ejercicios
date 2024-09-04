import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    personsService.getAll()
      .then(response => {
        console.log('Response data:', response.data);
        if (Array.isArray(response.data)) {
          setPersons(response.data);
        } else {
          console.error('Unexpected data format:', response.data);
          setPersons([]);
        }
      })
      .catch(error => {
        console.error('Failed to fetch persons:', error);
        setPersons([]);
      });
  }, []);
  

  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      const confirmChange = window.confirm(`Change the number of ${existingPerson.name}?`);
      if (confirmChange) {
        const personObject = { ...existingPerson, number: newNumber };
        personsService.update(existingPerson.id, personObject)
          .then(response => {
            setPersons(persons.map(person =>
              person.id === response.data.id ? response.data : person
            ));
            setNewName("");
            setNewNumber("");
            setErrorMessage(`The person's number '${personObject.name}' was modified from the server`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          })
          .catch(error => {
            setErrorMessage(`Information of '${personObject.name}' has already been removed`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    } else {
      const personObject = { name: newName, number: newNumber };
      personsService.create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
          setErrorMessage(`The person '${personObject.name}' was added to the server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const handlePersonChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const personsToShow = (persons || []).filter(
    person =>
      person.name && person.name.toLowerCase().includes((filter || "").toLowerCase())
  );

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id);
    if (person) {
      const deleteConfirm = window.confirm(`Delete ${person.name}?`);
      if (deleteConfirm) {
        personsService.deletePerson(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id));
          })
          .catch(error => {
            console.error(`No se pudo eliminar la persona con ID ${id}.`, error);
            alert(`La persona con ID ${id} no se pudo eliminar. Puede que ya haya sido eliminada o no exista.`);
          });
      }
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <Notification message={errorMessage} />
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handlePersonChange={handlePersonChange}
      />
      <h2>Numbers</h2>
      <Numbers personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
