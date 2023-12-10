import serverApi from "../services/server-api";

const DataDisplay = ({ persons, handleDelete }) => {
  console.log("DataDisplay", persons, handleDelete);
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return (
          <>
            <p key={person.name}> {person.name} {person.number} <button onClick={() => handleDelete(person.name)}>delete</button> </p>
          </>
        );
      })}
    </>
  );
};

export default DataDisplay;
