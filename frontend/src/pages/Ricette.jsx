import React, { useState, useEffect } from 'react';
import { Preparazioni } from './backoffice';

export default function Ricette() {
  const [ricette, setRicette] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRicette = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/ricette'); // Assicurati che il percorso API sia corretto
        if (!response.ok) {
          throw new Error('Errore durante il recupero delle ricette');
        }
        const data = await response.json();
        setRicette(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchRicette();
  }, []);

  return (
    <>
    <div className="container my-5">
      <h1 className="text-center mb-4">Le Nostre Ricette</h1>
      
      {error && <p className="text-danger text-center">Errore: {error}</p>}

      {ricette.length > 0 ? (
        ricette.map((ricetta) => (
          <div key={ricetta._id} className="card mb-3">
            <div className="row g-0">
              {ricetta.immagine && (
                <div className="col-md-4">
                  <img src={ricetta.immagine} alt={ricetta.titolo} className="img-fluid rounded-start" />
                </div>
              )}
              <div className={`col-md-${ricetta.immagine ? "8" : "12"}`}>
                <div className="card-body">
                  <h5 className="card-title">{ricetta.titolo}</h5>
                  <p className="card-text"><strong>Ingredienti:</strong> {ricetta.ingredienti.join(', ')}</p>
                  <p className="card-text"><strong>Preparazione:</strong> {ricetta.preparazione}</p>
                  <p className="card-text"><strong>Tempo di preparazione:</strong> {ricetta.tempoPreparazione} minuti</p>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">Non ci sono ricette al momento.</p>
      )}
    </div>
    <Preparazioni/>
  </>
  );
}
