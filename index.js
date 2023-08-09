const contacts = require("./contacts.js");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
const argv = require("yargs").argv;

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break
    case "get":
      const getContactsById = await contacts.getContactById(id);
      console.table(getContactsById);
      break
    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.table(newContact);
      break
    case "remove":
      const deleteContact = await contacts.removeContact(id);
      console.table(deleteContact);
      break
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// invokeAction({action: 'list'});
// invokeAction({action: 'get', id: '8'});
// invokeAction({action: 'add', name: 'Lourence', email: 'loe@gmail.com', phone: '(715) 524-5792'});
// invokeAction({ action: "remove", id: "vmD9fXpTwlot1Pj2HDWty" });

invokeAction(argv);