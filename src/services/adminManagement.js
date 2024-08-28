import { ref as dbRef, set, remove } from "firebase/database";
import { database } from "../firebase/firebase";

// Add an admin user
export const addAdmin = (userId) => {
  const adminRef = dbRef(database, `admin_users/${userId}`);
  return set(adminRef, true)
    .then(() => console.log("Admin added successfully"))
    .catch((error) => console.error("Error adding admin:", error));
};

// Remove an admin user
export const removeAdmin = (userId) => {
  const adminRef = dbRef(database, `admin_users/${userId}`);
  return remove(adminRef)
    .then(() => console.log("Admin removed successfully"))
    .catch((error) => console.error("Error removing admin:", error));
};
