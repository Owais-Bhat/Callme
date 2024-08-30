import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import LoginPage from "./Auth/LoginPage";
import AdminManagement from "./components/AdminManagement/AdminManagement";
import PrivateRoute from "../src/components/PrivateRoute"; // Import the PrivateRoute component

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/admin-panel"
            element={
              <PrivateRoute>
                <AdminPanel />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin-management"
            element={
              <PrivateRoute>
                <AdminManagement />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
