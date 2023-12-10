const express = require("express");
const app = express();

// get the phonebook data
let data = require("./phonebook.json");
let morgan = require("morgan");
console.log("data", data);
/*
Without the json-parser, the body property would be undefined. The json-parser takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object before the route handler is called.
*/
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'));

morgan.token('data', function (req, res) { return JSON.stringify(req.body) })
// get home page
app.get("/", (request, response) => {
  response.redirect("/api/persons");
});

app.get("/api/persons", (request, response) => {
  response.json(data);
});

app.get("/info", (request, response) => {
  const date = new Date();
  response.send(
    `<p>Phonebook has info for ${data.length} people</p> <p>${date}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = data.find((person) => person.id === id);
  if (!person) {
    response.status(404).end();
  }
  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  data = data.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "missing parameters",
    });
  }
  if (isNameInPhonebook(body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };
  data = data.concat(person);
  response.json(person);
});

const generateId = () => {
  const maxId = data.length > 0 ? Math.max(...data.map((n) => n.id)) : 0;
  return maxId + 1;
};

const isNameInPhonebook = (name) => {
  return data.some((person) => {
    return person.name.toLowerCase() === name.toLowerCase();
  });
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
