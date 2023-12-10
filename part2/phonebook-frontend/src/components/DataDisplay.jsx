const DataDisplay = ({ persons, handleDelete }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((person) => {
        {/* console.log("KEY FOR PERSON", person) */}
        return (
        <div key={person.id}>
          <p>
            {" "}
            {person.name} {person.number}
          </p>
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      )})}
    </>
  );
};

export default DataDisplay;
