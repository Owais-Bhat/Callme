import React, { useState, useEffect } from "react";
import { database } from "../../firebase/firebase";
import { ref as dbRef, onValue } from "firebase/database";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Button,
  Avatar,
  Collapse,
  Tooltip,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import * as XLSX from "xlsx";
import { styled } from "@mui/system";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const usersRef = dbRef(database, "users");
    onValue(usersRef, (snapshot) => {
      try {
        const usersData = snapshot.val();
        const formattedUsers = [];

        if (usersData) {
          setTotalUsers(Object.keys(usersData).length);

          Object.keys(usersData).forEach((userId) => {
            const userName = usersData[userId]?.preferences?.name || "Unknown";
            const userContacts = usersData[userId]?.contacts || {};
            const contactCount = Object.keys(userContacts).length;

            formattedUsers.push({
              userId,
              userName,
              contactCount,
              contacts: Object.values(userContacts).map((contactData) => ({
                id: contactData.id,
                name:
                  contactData.name ||
                  `${contactData.firstName} ${contactData.lastName}` ||
                  "Unknown",
                phoneNumbers: contactData.phoneNumbers || [],
                imageAvailable: contactData.imageAvailable || false,
                imageUrl: contactData.imageAvailable
                  ? contactData.imageUrl
                  : "/default-avatar.png",
              })),
            });
          });
        }

        setUsers(formattedUsers);
      } catch (err) {
        setError("Failed to fetch users.");
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId === selectedUserId ? null : userId);
  };

  const downloadContacts = (contacts) => {
    // Flatten contacts with separate rows for each phone number
    const formattedContacts = contacts.flatMap((contact) =>
      contact.phoneNumbers.map((pn) => ({
        Name: contact.name,
        Phone: pn.number || "N/A",
      }))
    );

    const worksheet = XLSX.utils.json_to_sheet(formattedContacts);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
    XLSX.writeFile(workbook, "contacts.xlsx");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Admin Panel
      </Typography>
      <Typography variant="h6" gutterBottom align="center">
        Total Users: {totalUsers}
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : users.length === 0 ? (
        <Typography align="center">No users available</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User Name</TableCell>
                <TableCell align="right">Contact Count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <React.Fragment key={user.userId}>
                  <StyledTableRow
                    onClick={() => handleUserClick(user.userId)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      <Tooltip title="Click to view contacts" arrow>
                        <span>{user.userName}</span>
                      </Tooltip>
                      <IconButton size="small">
                        <ExpandMoreIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="right">{user.contactCount}</TableCell>
                  </StyledTableRow>
                  <TableRow>
                    <TableCell style={{ padding: 0 }} colSpan={2}>
                      <Collapse
                        in={selectedUserId === user.userId}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box margin={2}>
                          {user.contacts.map((contact) => (
                            <TableRow key={contact.id}>
                              <TableCell style={{ paddingLeft: "40px" }}>
                                <Avatar
                                  src={
                                    contact.imageAvailable
                                      ? contact.imageUrl
                                      : "/default-avatar.png"
                                  }
                                  alt={contact.name}
                                />
                                <span>{contact.name}</span>
                              </TableCell>
                              <TableCell>
                                {contact.phoneNumbers?.map((pn) => (
                                  <div key={pn.id || pn.number}>
                                    {pn.number || "N/A"}
                                  </div>
                                ))}
                              </TableCell>
                            </TableRow>
                          ))}
                          <Box display="flex" justifyContent="flex-end" mt={2}>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => downloadContacts(user.contacts)}
                            >
                              Download Contacts
                            </Button>
                          </Box>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminPanel;
