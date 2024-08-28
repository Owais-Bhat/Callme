import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Define allowed credentials
  const allowedCredentials = [
    { email: "awais@gmail.com", password: "awais1" },
    { email: "user@example.com", password: "user123" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the provided credentials are valid
    const isValid = allowedCredentials.some(
      (cred) => cred.email === email && cred.password === password
    );

    if (isValid) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/admin-panel"); // Navigate to Admin Panel after successful login
      } catch (err) {
        setError("Failed to login. Please try again.");
        console.error("Login error:", err);
      }
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
