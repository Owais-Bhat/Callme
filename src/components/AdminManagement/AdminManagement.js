import React, { useState } from "react";
import { addAdmin, removeAdmin } from "../../services/adminManagement";

const AdminManagement = () => {
  const [userId, setUserId] = useState("");

  const handleAddAdmin = async () => {
    try {
      await addAdmin(userId);
      alert("Admin added successfully!");
    } catch (error) {
      alert("Error adding admin.");
    }
  };

  const handleRemoveAdmin = async () => {
    try {
      await removeAdmin(userId);
      alert("Admin removed successfully!");
    } catch (error) {
      alert("Error removing admin.");
    }
  };

  return (
    <div>
      <h2>Manage Admins</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleAddAdmin}>Add Admin</button>
      <button onClick={handleRemoveAdmin}>Remove Admin</button>
    </div>
  );
};

export default AdminManagement;
