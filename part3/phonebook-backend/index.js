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
// app.get("/", (request, response) => {
//   response.redirect("/api/persons");
// });

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

app.get("/api/persons/:id", (request, response, next) => {
  Contact.findById(request.params.id)
    .then((contact) => {
      if (contact) {
        console.log("ContactFound", contact);
        response.json(contact);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      // console.log(error);
      next(error);
    });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
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

// update contact
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const contact = {
    name: body.name,
    number: body.number,
  };

  // [options.new=false] «Boolean» if true, return the modified document rather than the original
  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then((updatedContact) => {
      response.json(updatedContact);
    })
    .catch((error) => next(error));
});

// unknown endpoint handler
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

// error handler
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
