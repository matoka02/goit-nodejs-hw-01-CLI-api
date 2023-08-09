const fs = require("fs").promises;
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(contacts);
};

const getContactById = async (id) => {
  const contactId = String(id);
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (id) => {
  const contactId = String(id);
  const contacts = await listContacts();
  // const newContacts = contacts.filter(({ id }) => id !== contactId);
  // await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), {
  //   encoding: "utf-8",
  // });

  // return newContacts;
  const index = contacts.findIndex(item => item.id === contactId);
  if(index === -1){
      return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result||null;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const updatedContacts = [newContact, ...contacts];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2), {
    encoding: "utf-8",
  });
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
