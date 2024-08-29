import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminPanel/AdminPanel";
import LoginPage from "./Auth/LoginPage";
import AdminManagement from "./components/AdminManagement/AdminManagement";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/admin-management" element={<AdminManagement />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
