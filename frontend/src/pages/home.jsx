import React from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import hook from "../assets/fishing-hook.png";
import salmon from "../assets/salmon.png";
import iceCubes from "../assets/ice-cubes.png";
import respect from "../assets/respect.png";
import whatsapp from "../assets/whatsapp.png";
import logoFooter from "../assets/logo-footer.jpg";
import waveCut from "../assets/wave-cut.jpg";
import waveCut2 from "../assets/wave-cut2.png";


export default function Home() {
  const navigate = useNavigate(); // Usa l'hook useNavigate

  // Funzione per gestire il click e navigare verso /gallery
  const handleNavigate = () => {
    navigate("/gallery");
  };

  // Funzione per gestire la navigazione a /ricette
  const handleNavigateRicette = () => {
    navigate("/ricette");
  };

    // Funzione per gestire la navigazione a /ricette
    const handleNavigateBacheca = () => {
      navigate("/bacheca");
    };

  return (
    <>
      <div className="conteiner-hero d-flex justify-content-center flex-column align-items-center">
        <img src={logoFooter} className="logo-hero" alt="Logo" />
        <h1>La pescheria di Andrea Russo</h1>
        <h2>dà un'occhiata qui sotto!</h2>
        <p className="fs-3">
          Da noi, pesce fresco e sfilettato ogni giorno, vieni a trovarci o
          contattaci direttamente su WhatsApp!
        </p>
      </div>

      <div className="main-container row-cols-2 g-1">
        <div className="first-div d-flex flex-column align-items-center p-3">
          <label>I nostri prodotti:</label>
          <h2 className="text-center">Freschi e sfilettati alla perfezione</h2>
          <p>Con passione e dedizione dal nostro staff</p>
          {/* Al click sul bottone, navighiamo alla pagina /gallery */}
          <button onClick={handleNavigate}>Guarda i nostri prodotti</button>
        </div>

        <div className="side-image-container">
          <div className="side-image-one">
            <a href="#" className="full-link" onClick={handleNavigateRicette}>
              <div className="contenitore-hp">Il mare a casa tua</div>
            </a>
          </div>

          <div className="side-image-two">
            <a href="#" className="full-link" onClick={handleNavigateBacheca}>
              <div className="contenitore-hp">La nostra Bacheca</div>
            </a>
          </div>
        </div>
      </div>

      {/* INFO DI BASE */}
      <div className="info-base d-flex justify-content-center align-items-center mt-5">
        <img src={hook} className="col-3 me-3" alt="Hook" />
        <div className="col-6 d-flex-column justify-content-center align-items-center">
          <h2 className="text-center">Pesce fresco tutti i giorni</h2>
          <h3 className="text-center fs-1">Sfilettatura gratuita</h3>
          <p className="text-center fs-4">
            Puoi trovarci a via Tommaso Campanella n: 7, Mater domini, Catanzaro
            siamo aperti dal martedì al sabato dalle 7:00 fino alle 14:00
          </p>
        </div>
      </div>

      {/* PRE-FOOTER */}
      <div className="pre-footer container d-flex">
        <div className="image-pack-one">
          <img src={iceCubes} className="col-3" alt="Ice cubes" />
          <h4 className="fs-2">Freschezza garantita</h4>
          <p className="fs-4">Il nostro pescato è sempre fresco</p>
        </div>

        <div className="image-pack-two">
          <img src={salmon} className="col-3" alt="Salmon" />
          <h4 className="fs-2">Pulito e sfilettato</h4>
          <p className="fs-4">
            Offriamo il nostro servizio di sfilettatura gratuita
          </p>
        </div>

        <div className="image-pack-three">
          <img src={respect} className="col-3" alt="Respect" />
          <h4 className="fs-2">Cortesia e dedizione</h4>
          <p className="fs-4">
            Il nostro personale è sempre disponibile a venirti incontro
          </p>
        </div>

        <div className="image-pack-four">
          <img src={whatsapp} className="col-3" alt="WhatsApp" />
          <h4 className="fs-2">Chiamaci o scrivici su WhatsApp</h4>
          <p className="fs-4">
            Ci trovi sempre disponibili in orario di lavoro. Prova a
            contattarci!
          </p>
        </div>
      </div>

      {/* WAVE */}
      <div className="wave-container">
        <img src={waveCut} className="wave-1" alt="Wave 1" />
        <img src={waveCut2} className="wave-2" alt="Wave 2" />
      </div>
    </>
  );
}
