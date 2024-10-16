const Numbers = ({ personsToShow, deletePerson }) => {
  console.log('Persons to show in Numbers:', personsToShow);
  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => deletePerson(person.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Numbers;
