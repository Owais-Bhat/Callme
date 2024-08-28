import React, { useState, useEffect } from "react";
import { database } from "../../firebase/firebase";
import { ref as dbRef, onValue } from "firebase/database";
import * as XLSX from "xlsx";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { SaveAlt as SaveAltIcon } from "@mui/icons-material";

const AdminPanel = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const usersRef = dbRef(database, "users");
    onValue(usersRef, (snapshot) => {
      try {
        const usersData = snapshot.val();
        const formattedData = [];

        if (usersData) {
          Object.keys(usersData).forEach((userId) => {
            // Fetch user preferences to get the user's name
            const userPreferences = usersData[userId]?.preferences || {};
            const userName = userPreferences.name || "Unknown User";

            const userContacts = usersData[userId]?.contacts || {};

            Object.keys(userContacts).forEach((contactId) => {
              const contact = userContacts[contactId];
              const name = contact?.name || "Unknown";
              const phoneNumbers = contact?.phoneNumbers || [];

              phoneNumbers.forEach((phoneNumber) => {
                formattedData.push({
                  id: `${userId}_${contactId}_${phoneNumber.id}`,
                  userName,
                  name,
                  phoneNumber: phoneNumber.number,
                });
              });
            });
          });
        }

        // Remove duplicates
        const uniqueContacts = Array.from(
          new Map(
            formattedData.map((contact) => [contact.id, contact])
          ).values()
        );

        setContacts(uniqueContacts);
      } catch (err) {
        setError("Failed to fetch contacts.");
        console.error("Error fetching contacts:", err);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(contacts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
    XLSX.writeFile(workbook, "contacts.xlsx");
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom align="center">
        Admin Panel
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : contacts.length === 0 ? (
        <Typography align="center">No contacts available</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>{contact.userName}</TableCell>
                    <TableCell>{contact.id}</TableCell>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.phoneNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveAltIcon />}
            onClick={downloadExcel}
            style={{ marginTop: "20px" }}
          >
            Download as Excel
          </Button>
        </>
      )}
    </Container>
  );
};

export default AdminPanel;
