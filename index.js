const contacts = require("./contacts.js");
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const arr = hideBin(process.argv);
// const { argv } = yargs(arr);
const argv = require('yargs').argv

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts();
      break;
    case "get":
      contacts.getContactById(id);
      break;

    case "add":
      contacts.addContact(name, email, phone);
      break;

    case "remove":
      contacts.removeContact(id);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

// (async () => {
//   await invokeAction(argv);
// })();

invokeAction(argv);
