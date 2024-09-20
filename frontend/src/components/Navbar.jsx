import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from "react";


export default function MyNav() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null); // Stato per gestire il ruolo dell'utente
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole'); // Recupera il ruolo dal localStorage
    setIsAuthenticated(!!token);
    setUserRole(role);

    // Ascolta il cambiamento dell'autenticazione
    const handleAuthChange = (event) => {
      setIsAuthenticated(event.detail.isAuthenticated);
      setUserRole(event.detail.userRole); // Aggiorna il ruolo dell'utente
    };
    console.log(userRole);

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Rimuovi il ruolo dal localStorage
    setIsAuthenticated(false);
    setUserRole(null); // Resetta il ruolo
    navigate('/login');
  };



  const handleOpenMap = () => {
    // Inserisci qui il link generato da Google Maps
    const googleMapsLink = "https://maps.app.goo.gl/agsYRvWGBzkFSkjt6";
    window.open(googleMapsLink, "_blank"); // Apre Google Maps in una nuova scheda
    console.log("mappa");
    
  };

  return (
    <Navbar expand={false} className="navbar mb-3 px-0">
      <Container fluid>
        <Navbar.Brand href="#" className="text-white" onClick={() => navigate('/')}>
          La Pescheria di Andrea Russo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-false`}
          aria-labelledby={`offcanvasNavbarLabel-expand-false`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
              La tua Pescheria di fiducia
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate('/gallery')}>I nostri prodotti</Nav.Link>
              <Nav.Link onClick={() => navigate('/ricette')}>Le ricette</Nav.Link>
              <Nav.Link onClick={() => navigate('/bacheca')}>Bacheca</Nav.Link>
              <Nav.Link onClick={handleOpenMap}>Vieni a Trovarci</Nav.Link> 

              {/* Mostra "Gestione Annunci" solo se l'utente è admin */}
              {isAuthenticated && userRole === 'admin' && (
                <>
                  <Nav.Link onClick={() => navigate('/gestione-annunci')}>Gestione Annunci</Nav.Link>
                  <Nav.Link onClick={() => navigate('/gestione-ricette')}>Gestione Ricette</Nav.Link> 
                
                </>
              )}

              {/* Mostra Carrello se l'utente è autenticato */}
              {isAuthenticated ? (
                
                <>
                  {/* <Nav.Link onClick={() => navigate('/carrello')}>Carrello</Nav.Link> */}
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <NavDropdown title="Sottomenù" id={`offcanvasNavbarDropdown-expand-false`}>
                    <NavDropdown.Item onClick={() => navigate('/login')}>Login</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigate('/register')}>Registrati</NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}
