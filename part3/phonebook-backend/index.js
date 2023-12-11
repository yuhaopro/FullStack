require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
// get the phonebook model
const Contact = require("./models/phonebook-mongo");

// get the phonebook data (Removed because we are using mongodb)
// let data = require("./phonebook.json");
let morgan = require("morgan");
/*
Without the json-parser, the body property would be undefined. The json-parser takes the JSON data of a request, transforms it into a JavaScript object and then attaches it to the body property of the request object before the route handler is called.
*/

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

morgan.token("data", function (req, res) {
  return JSON.stringify(req.body);
});
// get home page
app.get("/", (request, response) => {
  response.redirect("/api/persons");
});

app.get("/api/persons", (request, response) => {
  Contact.find({}).then((contacts) => {
    console.log(contacts);
    response.json(contacts);
  });
});

app.get("/info", (request, response) => {
  const date = new Date();
  Contact.countDocuments({}).then((res) => {
    console.log("countDocuments", res);
    response.send(`<p>Phonebook has info for ${res} people</p> <p>${date}</p>`);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Contact.findById(request.params.id).then((contact) => {
    console.log("ContactFound", contact);
    response.json(contact); 
  });
});

app.delete("/api/persons/:id", (request, response) => {
  Contact.deleteOne({ _id: request.params.id }).then((result) => {
    response.status(204).end();
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "missing parameters",
    });
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  });

  contact.save().then((savedContact) => {
    console.log(JSON.stringify(savedContact));
    response.json(savedContact);
  });
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
