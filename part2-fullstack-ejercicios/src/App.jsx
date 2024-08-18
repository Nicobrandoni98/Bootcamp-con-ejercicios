import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import axios from "axios";
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setfilter] = useState("");

  useEffect(() => {
    personsService.getAll().then((response) => {
      setPersons(response.data);
    });
  }, []);


  const addPerson = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName)

    if (existingPerson) {
      const confirmChange = window.confirm(`Change the number of ${existingPerson.name} ?`)
      if (confirmChange) {
        const personObject = {...existingPerson, number : newNumber
        }
        personsService.update(existingPerson.id,personObject).then((response) => {
          setPersons(persons.map(person => person.id === response.data.id ? response.data : person))
          setNewName("")
          setNewNumber("")
        })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personsService.create(personObject)
        .then((response) => {
          setPersons(persons.concat(response.data));
          setNewName("");
          setNewNumber("");
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
    setfilter(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name && person.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  const deletePerson = id => {
    const person = persons.find (person => person.id === id)
    
    if (person) {
      const deleteConfirm = window.confirm(`Delete ${person.name} ?`)
      if (deleteConfirm) {
      personsService.deletePerson(id).then(response => {
        setPersons(persons.filter(person => person.id !== id))
      }).catch(error => {
        console.error(`No se pudo eliminar la persona con ID ${id}.`, error)
        alert(`La persona con ID ${id} no se pudo eliminar. Puede que ya haya sido eliminada o no exista.`)
      })}   
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handlePersonChange={handlePersonChange}
      />
      <h2>Numbers</h2>
      <Numbers personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  );
};

export default App;
