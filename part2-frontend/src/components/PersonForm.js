const PersonForm = ({
  addPerson,
  newName,
  newNumber,
  handleNumberChange,
  handlePersonChange,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name:{" "}
        <input type="text" value={newName} onChange={handlePersonChange} />
      </div>
      <div>
        Number:{" "}
        <input type="text" value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
