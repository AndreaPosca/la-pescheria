import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Errore durante il login.");
      }

      const data = await response.json();
      console.log("Login eseguito con successo:", data);

      // Salva il token (o qualsiasi indicatore di autenticazione)
      localStorage.setItem("token", data.token);

      // Salva il token, il ruolo e le informazioni utente
      localStorage.setItem("userRole", data.user.role);
      console.log(data.user.role);

      // Aggiorna lo stato di autenticazione qui
      const event = new CustomEvent("authChange", {
        detail: {
          isAuthenticated: true,
          userRole: data.user.role,
        },
      });
      window.dispatchEvent(event);

      // Reindirizza alla homepage
      navigate("/");
    } catch (error) {
      console.error("Errore durante il login:", error);
      setError("Email o password non valide.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h1 className="text-center mb-4">Login</h1>
        {error && <p className="alert alert-danger text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Inserisci la tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-bold">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Inserisci la tua password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
