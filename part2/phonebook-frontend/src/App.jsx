import { useState, useEffect } from "react";
import DataDisplay from "./components/DataDisplay";
import serverAPI from "./services/server-api";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState(persons);
  const [newFilterString, setNewFilterString] = useState("");

  useEffect(() => {
    handleFilter(persons);
  }, [newFilterString, persons]);

  // initialize persons array
  useEffect(() => {
    serverAPI
      .getAll()
      .then((result) => {
        setPersons(persons.concat(result));
        // console.log("getAll fulfilled");
      })
      .catch((err) => {
        // console.log("Unable to retrieve phonebook data");
      });
  }, []);

  // callback for input change name
  const handleOnChangeName = (event) => {
    setNewName(event.target.value);
  };

  // callback for input change number
  const handleOnChangeNumber = (event) => {
    setNewNumber(event.target.value);
  };

  // callback for input change filter
  const handleOnChangeFilter = (event) => {
    setNewFilterString(event.target.value);
  };

  const handleFilter = (currentPersons) => {
    const regex = new RegExp(`^${newFilterString}`, "i");
    setNewFilter(currentPersons.filter((person) => regex.test(person.name)));
  };

  // // generate id
  // const generateId = () => {
  //   const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  //   return maxId + 1;
  // };

  // prevent redirect, and add the person name into the persons array
  const handleAddPerson = (event) => {
    // console.log("AddName");
    event.preventDefault();
    let duplicatePerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (duplicatePerson) {
      serverAPI
        .update(duplicatePerson.id, { name: newName, number: newNumber })
        .then((result) => {
          console.log("Succesfully updated contact");
          const updatedPersons = persons.map((person) =>
            person.id === duplicatePerson.id ? result : person
          );
          setPersons(updatedPersons);
          handleFilter(persons); // Pass the updated list
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    } else if (newName === "") {
      alert("name cannot be blank!");
    } else {
      serverAPI
        .create({ name: newName, number: newNumber })
        .then((result) => {
          // console.log("new persons array", result)
          setPersons(persons.concat(result));
          handleFilter(persons); // Pass the updated list
        })
        .catch((err) => {
          // console.log("Did not manage to add person!", error);
        });
    }

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    // console.log("handling delete");
    // make call to database to delete resource given id
    serverAPI
      .deletePerson(id)
      .then(() => {
        setPersons(
          persons.filter((person) => {
            // console.log("person", person.id, id);
            return person.id !== id;
          })
        );
      })
      .catch((error) => {
        // console.log("error deleting user!", error);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form id="addUser" onSubmit={handleAddPerson}>
        <div>
          filter by name:{" "}
          <input
            value={newFilterString}
            onChange={handleOnChangeFilter}
          ></input>
          <br></br>
          name: <input value={newName} onChange={handleOnChangeName} />
          <br></br>
          number:{" "}
          <input value={newNumber} onChange={handleOnChangeNumber}></input>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <DataDisplay persons={newFilter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
