const { program } = require("commander");

const contacts = require("./db/contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.getListContacts();
      return console.log(allContacts);

    case "get":
      const contactById = await contacts.getContactById(id);
      return console.log(contactById);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);

    case "remove":
      const removeBook = await contacts.removeContactById(id);
      return console.log(removeBook);

    case "update":
      const updateContact = await contacts.updateById(id, {
        name,
        email,
        phone,
      });
      return console.log(updateContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("--action, <type>")
  .option("--id, <type>")
  .option("--name, <type>")
  .option("--email, <type>")
  .option("--phone, <type>");

program.parse();

const options = program.opts();

invokeAction(options);
