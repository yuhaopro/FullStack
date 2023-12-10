import { useState, useEffect } from "react";
import DataDisplay from "./components/DataDisplay";
import serverAPI from "./services/server-api";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [duplicateName, setDuplicateName] = useState(false);
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
        console.log("getAll fulfilled");
      })
      .catch((err) => {
        console.log("Unable to retrieve phonebook data");
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

  // prevent redirect, and add the person name into the persons array
  const handleAddPerson = (event) => {
    // console.log("AddName");
    setDuplicateName(false);
    event.preventDefault();
    if (
      persons.some((person) => {
        return person.name.toLowerCase() === newName.toLowerCase();
      })
    ) {
      setDuplicateName(true);
      alert("name already exist!");
    } else if (newName === "") {
      alert("name cannot be blank!");
    } else {
      const newPersons = persons.concat({ name: newName, number: newNumber });
      serverAPI
        .create({ name: newName, number: newNumber })
        .then((result) => {
          setPersons(newPersons);
          handleFilter(newPersons); // Pass the updated list
        })
        .catch((err) => {
          console.log("Did not manage to add person!");
        });
    }

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (name) => {
    // make call to database to delete resource given id
    serverApi
      .deletePerson(name)
      .then(() => {
        setPersons(persons.filter(() => person.name !== name));
      })
      .catch((error) => {
        console.log("error deleting user!");
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
