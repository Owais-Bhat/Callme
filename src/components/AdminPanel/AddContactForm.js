import React, { useState } from "react";
import { addContact } from "../../services/contactManagement";

const AddContactForm = ({ userId }) => {
  const [contactId, setContactId] = useState("");
  const [contactData, setContactData] = useState({
    name: "",
    phoneNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addContact(userId, contactId, contactData);
      alert("Contact added successfully!");
    } catch (error) {
      alert("Error adding contact.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Contact ID"
        value={contactId}
        onChange={(e) => setContactId(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Name"
        value={contactData.name}
        onChange={(e) =>
          setContactData({ ...contactData, name: e.target.value })
        }
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={contactData.phoneNumber}
        onChange={(e) =>
          setContactData({ ...contactData, phoneNumber: e.target.value })
        }
        required
      />
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default AddContactForm;
