import { ref as dbRef, set } from "firebase/database";
import { database } from "../firebase/firebase";

// Add a contact to a user
export const addContact = (userId, contactId, contactData) => {
  const contactRef = dbRef(database, `users/${userId}/contacts/${contactId}`);
  return set(contactRef, contactData)
    .then(() => console.log("Contact added successfully"))
    .catch((error) => console.error("Error adding contact:", error));
};
