import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase/firebase"; // Make sure to import your Firebase auth

const PrivateRoute = ({ children }) => {
  const user = auth.currentUser;

  return user ? children : <Navigate to="/" />;
};

export default PrivateRoute;
