const mongoose = require("mongoose");

const password = process.argv[2];
const nameToAdd = process.argv[3];
const phoneNumberToAdd = process.argv[4];

const url = `mongodb+srv://yuhaopro:${password}@cluster0.msteh23.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

// defining the schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
});

// defining the model
const Contact = mongoose.model("Contact", contactSchema);

const createContact = () => {
  const contact = new Contact({
    name: nameToAdd,
    number: phoneNumberToAdd,
  });

  contact.save().then((result) => {
    console.log(`added ${result.name} to phonebook`);
    mongoose.connection.close();
  });
};

const retrieveContacts = () => {
  console.log("phonebook:");
  Contact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(contact.name, contact.number);
    });
    mongoose.connection.close();
  });
};
if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
} else if (process.argv.length < 4) {
  // call find function to retrieve all values
  retrieveContacts();
} else if (process.argv.length < 6) {
  // call function create
  createContact();
}
