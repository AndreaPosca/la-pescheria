//import image from "./assets/swordfish.jpg"
import "./App.css";
import MyNav from "./components/Navbar.jsx"; //ERRORE DIMMè
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Gallery, { Preparazioni } from "./pages/backoffice.jsx";
import { Ricette } from './pages/backoffice.jsx';  // Usa le graffe per il named export
import GestioneAnnunci from './pages/GestioneAnnunci';  // Importa il componente GestioneAnnunci
import { Bacheca } from './pages/backoffice';  // Assicurati di importare correttamente
import Register from "./pages/register.jsx";
import Login from "./pages/login.jsx";
import WhatsAppButton from "./components/bottoneWhatApp.jsx";
import MyFooter from "./components/Footer.jsx";
import GestioneRicette from "./pages/GestioneRicette.jsx";


function App() {
  return (
    <>
      <Router>
        <MyNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/ricette" element={<><Ricette /> <Preparazioni/></>}/>
          <Route path="/gestione-ricette" element={<GestioneRicette />}/>
          <Route path="/bacheca" element={<Bacheca />} />
          <Route path="/gestione-annunci" element={<GestioneAnnunci />} /> 
          <Route path="/register" element={<Register />} />   
          <Route path="/login" element={<Login />} /> 
        </Routes>
      {/* FOOTER */}
      <MyFooter/>
      </Router>

      {/* Mostra il pulsante WhatsApp su tutte le pagine tranne l'admin */}
      {!window.location.pathname.includes("/admin") && <WhatsAppButton />}


    </>
  );
}

export default App;
