import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setfilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      console.log(response);
    });
  }, []);


  const addPerson = (event) => {
    event.preventDefault();

    if (persons.find((person) => person.name === newName)) {
      alert("Ingresa un nombre que no haya sido ingresado");
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      axios
        .post("http://localhost:3001/persons", personObject)
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
    person.name.toLowerCase().includes(filter.toLowerCase())
  );
  
  const deletePerson = id => {
    const url = `http://localhost:3001/persons/${id}`
    axios.delete(url).then(response => {
      setPersons(persons.filter(person => person.id !== id))
    }).catch(error => {
      console.error(`No se pudo eliminar la persona con ID ${id}.`, error)
      alert(`La persona con ID ${id} no se pudo eliminar. Puede que ya haya sido eliminada o no exista.`)
    })
    
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
