const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.log("Contacts list:");
      return console.table(allContacts);

    case "get":
      const contact = await getContactById(id);
      return console.table(contact);

    case "add":
      const newContact = await addContact({ name, email, phone });
      console.log(
        `Contact with name ${name}, email ${email}, phone ${phone} is added!`
      );
      return console.table(newContact);

    case "remove":
      const removedContact = await removeContact(id);
      console.log(`Contact with id ${id} is removed!`);
      return console.table(removedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
