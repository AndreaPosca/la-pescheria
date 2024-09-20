import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Stato per la conferma della password
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Verifica che le password coincidano
    if (password !== confirmPassword) {
      setMessage("Le password non coincidono.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Errore durante la registrazione.");
      }

      const data = await response.json();
      setMessage("Registrazione avvenuta con successo!");
      setEmail("");
      setPassword("");
      setConfirmPassword(""); // Resetta anche il campo conferma password
      setUsername("");
      navigate("/login");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">Registrazione</h2>
        {message && <p className={`alert ${message === "Registrazione avvenuta con successo!" ? 'alert-success' : 'alert-danger'} text-center`}>{message}</p>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label fw-bold">Nome utente</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Inserisci il tuo nome utente"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-bold">Email</label>
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
            <label htmlFor="password" className="form-label fw-bold">Password</label>
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
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label fw-bold">Conferma Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Conferma la tua password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {password !== confirmPassword && confirmPassword && (
              <div className="text-danger mt-2">
                Le password non coincidono.
              </div>
            )}
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? "Registrazione in corso..." : "Registrati"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
