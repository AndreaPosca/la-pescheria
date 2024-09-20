import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import pescato1 from "../assets/gallery-numerata/1.jpg";
import pescato2 from "../assets/gallery-numerata/2.jpg";
import pescato3 from "../assets/gallery-numerata/3.jpg";
import pescato4 from "../assets/gallery-numerata/4.jpg";
import pescato5 from "../assets/gallery-numerata/5.jpg";
import pescato6 from "../assets/gallery-numerata/6.jpg";
import pescato7 from "../assets/gallery-numerata/7.jpg";
import pescato8 from "../assets/gallery-numerata/8.jpg";
import pescato9 from "../assets/gallery-numerata/9.jpg";
import pescato10 from "../assets/gallery-numerata/10.jpg";
import pescato11 from "../assets/gallery-numerata/11.jpg";
import pescato12 from "../assets/gallery-numerata/12.jpg";
import pescato13 from "../assets/gallery-numerata/13.jpg";
import pescato14 from "../assets/gallery-numerata/14.jpg";
import pescato15 from "../assets/gallery-numerata/15.jpg";
import pescato16 from "../assets/gallery-numerata/16.jpg";
import pescato17 from "../assets/gallery-numerata/17.jpg";
import pescato18 from "../assets/gallery-numerata/18.jpg";
import pescato19 from "../assets/gallery-numerata/19.jpg";
import pescato20 from "../assets/gallery-numerata/20.jpg";
import pescato21 from "../assets/gallery-numerata/21.jpg";
import pescato22 from "../assets/gallery-numerata/22.jpg";
import pescato23 from "../assets/gallery-numerata/23.jpg";
import pescato24 from "../assets/gallery-numerata/24.jpg";
import pescato25 from "../assets/gallery-numerata/25.jpg";
import pescato26 from "../assets/gallery-numerata/26.jpg";
import pescato27 from "../assets/gallery-numerata/27.jpg";
import pescato28 from "../assets/gallery-numerata/28.jpg";
import pescato29 from "../assets/gallery-numerata/29.jpg";
import pescato30 from "../assets/gallery-numerata/30.jpg";
import pescato31 from "../assets/gallery-numerata/31.jpg";


const products = [
    {
        id: 1,
        name: 'Nome Prodotto 1',
        image: pescato1,
      },
      {
        id: 2,
        name: 'Nome Prodotto 2',
        image: pescato2,
      },
      {
        id: 3,
        name: 'Nome Prodotto 3',
        image: pescato3,
      },
      {
        id: 4,
        name: 'Nome Prodotto 4',
        image: pescato4,
      },
      {
        id: 5,
        name: 'Nome Prodotto 5',
        image: pescato5,
      },
      {
        id: 6,
        name: 'Nome Prodotto 6',
        image: pescato6,
      },
      {
        id: 7,
        name: 'Nome Prodotto 7',
        image: pescato7,
      },
      {
        id: 8,
        name: 'Nome Prodotto 8',
        image: pescato8,
      },
      {
        id: 9,
        name: 'Nome Prodotto 9',
        image: pescato9,
      },
      {
        id: 10,
        name: 'Nome Prodotto 10',
        image: pescato10,
      },
      {
        id: 11,
        name: 'Nome Prodotto 11',
        image: pescato11,
      },
      {
        id: 12,
        name: 'Nome Prodotto 12',
        image: pescato12,
      },
      {
        id: 13,
        name: 'Nome Prodotto 13',
        image: pescato13,
      },
      {
        id: 14,
        name: 'Nome Prodotto 14',
        image: pescato14,
      },
      {
        id: 15,
        name: 'Nome Prodotto 15',
        image: pescato15,
      },
      {
        id: 16,
        name: 'Nome Prodotto 16',
        image: pescato16,
      },
      {
        id: 17,
        name: 'Nome Prodotto 17',
        image: pescato17,
      },
      {
        id: 18,
        name: 'Nome Prodotto 18',
        image: pescato18,
      },
      {
        id: 19,
        name: 'Nome Prodotto 19',
        image: pescato19,
      },
      {
        id: 20,
        name: 'Nome Prodotto 20',
        image: pescato20,
      },
      {
        id: 21,
        name: 'Nome Prodotto 21',
        image: pescato21,
      },
      {
        id: 22,
        name: 'Nome Prodotto 22',
        image: pescato22,
      },
      {
        id: 23,
        name: 'Nome Prodotto 23',
        image: pescato23,
      },
      {
        id: 24,
        name: 'Nome Prodotto 24',
        image: pescato24,
      },
      {
        id: 25,
        name: 'Nome Prodotto 25',
        image: pescato25,
      },
      {
        id: 26,
        name: 'Nome Prodotto 26',
        image: pescato26,
      },
      {
        id: 27,
        name: 'Nome Prodotto 27',
        image: pescato27,
      },
      {
        id: 28,
        name: 'Nome Prodotto 28',
        image: pescato28,
      },
      {
        id: 29,
        name: 'Nome Prodotto 29',
        image: pescato29,
      },
      {
        id: 30,
        name: 'Nome Prodotto 30',
        image: pescato30,
      },
      {
        id: 31,
        name: 'Nome Prodotto 31',
        image: pescato31,
      },
];

//FUNZIONE DELLA GALLERY
export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState(null); // Stato per l'immagine selezionata
  
    // Funzione per chiudere il lightbox
    const closeLightbox = () => {
      setSelectedImage(null);
    };
  
    return (
      <div className="container-fluid my-5"> {/* Usa container-fluid per massimizzare lo spazio */}
        <h1 className="text-center mb-4">Galleria dei nostri Prodotti Ittici</h1>
        <div className="row"> {/* Rimuovi la classe gallery-container da qui, usa solo row */}
          {products.map(product => (
            <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 mb-4"> {/* Usa col-lg-4 per 3 colonne */}
              <div className="card product-card">
                <div className="position-relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-image" 
                  />
                  <div className="product-overlay">
                    <p onClick={() => setSelectedImage(product.image)} style={{ cursor: 'pointer' }}>
                      Maggiori informazioni
                    </p>
                  </div>
                </div>
                <div className="card-body text-center">
                  <h5 className="card-title">{product.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Lightbox che appare quando un'immagine viene cliccata */}
        {selectedImage && (
          <div className="lightbox">
            <div className="lightbox-content">
              <span className="close-button" onClick={closeLightbox}>✖</span> {/* Pulsante X per chiudere */}
              <img src={selectedImage} alt="Prodotto ingrandito" className="lightbox-image" />
            </div>
          </div>
        )}
      </div>
    );
}

//FUNZIONE DEI PREPARATI
export function Ricette() {

    const ricette = [
        {
            id: 1,
            nome: "Insalata di Mare",
            immagine: "https://via.placeholder.com/150", // Placeholder
            ingredienti: ["Polpo", "Gamberetti", "Calamari"],
            allergeni: ["Frutti di mare", "Crostacei"],
        },
        {
          id: 2,
          nome: "Insalata di polpo e patate",
          immagine: "https://via.placeholder.com/150", // Placeholder
          ingredienti: ["Polpo", "Patate", "Prezzemolo"],
          allergeni: ["Patate", "Polpo"],
        },
        {
          id: 3,
          nome: "Preparato misto scoglio",
          immagine: "https://via.placeholder.com/150", // Placeholder
          ingredienti: ["Cozze", "Gamberetti", "Calamari","Vongole"],
          allergeni: ["Frutti di mare", "Crostacei"],
      },
    ];

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">I nostri Preparati</h1>

            {ricette.map((ricetta) => (
                <div key={ricetta.id} className="card mb-3 justify-content-around" style={{ maxWidth: '100%' }}>
                    <div className="row g-3 p-2">
                        <div className="col-md-4">
                            <img
                                src={ricetta.immagine}
                                alt={ricetta.nome}
                                className="img-fluid rounded mx-auto d-block"
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body-two">
                                <h5 className="card-title">{ricetta.nome}</h5>
                                <p><strong>Ingredienti:</strong> {ricetta.ingredienti.join(", ")}</p>
                                <p><strong>Allergeni:</strong> {ricetta.allergeni.join(", ")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

//FUNZIONE DELLA BACHECA FRONTEND 
// BACHECA COMPONENT (Frontend)
export function Bacheca() {
  const [annunci, setAnnunci] = useState([]);
  const [error, setError] = useState(null); // Stato per gestire eventuali errori durante la fetch

  // Funzione per fare la GET degli annunci dal server
  useEffect(() => {
    const fetchAnnunci = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/annunci/annunci');
        if (!response.ok) {
          throw new Error('Errore durante il recupero degli annunci');
        }
        const data = await response.json();
        setAnnunci(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAnnunci();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Bacheca Annunci</h1>

      {/* Visualizzazione errori */}
      {error && <p className="text-danger text-center">Errore: {error}</p>}

      {/* Lista annunci */}
      {annunci.map((annuncio) => (
        <div key={annuncio.id} className="card mb-3">
          <div className="row g-0">
            {annuncio.immagine && (
              <div className="col-md-4">
                <img src={annuncio.immagine} alt={annuncio.titolo} className="img-fluid rounded-start" />
              </div>
            )}
            <div className={`col-md-${annuncio.immagine ? "8" : "12"}`}>
              <div className="card-body">
                <h5 className="card-title">{annuncio.titolo}</h5>
                <p className="card-text">{annuncio.contenuto}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Mostra un messaggio se non ci sono annunci */}
      {annunci.length === 0 && !error && (
        <p className="text-center">Non ci sono annunci al momento.</p>
      )}
    </div>
  );
}
  
export function Preparazioni() {
  const [preparazioni, setPreparazioni] = useState([]);
  const [error, setError] = useState(null); // Stato per gestire eventuali errori durante la fetch

  // Funzione per fare la GET degli annunci dal server
  useEffect(() => {
    const fetchPreparazioni = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/ricette/ricette');
        if (!response.ok) {
          throw new Error('Errore durante il recupero delle preparazioni delle ricette');
        }
        const data = await response.json();
        setPreparazioni(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPreparazioni();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Ricette</h1>

      {/* Visualizzazione errori */}
      {error && <p className="text-danger text-center">Errore: {error}</p>}

      {/* Lista annunci */}
      {preparazioni.map((preparazione) => (
        <div key={preparazione.id} className="card mb-3">
          <div className="row g-0">
            {preparazione.immagine && (
              <div className="col-md-4">
                <img src={preparazione.immagine} alt={preparazione.titolo} className="img-fluid rounded-start" />
              </div>
            )}
            <div className={`col-md-${preparazione.immagine ? "8" : "12"}`}>
              <div className="card-body">
                <h5 className="card-title">{preparazione.titolo}</h5>
                <p className="card-text">{preparazione.ingredienti}</p>
                <p className="card-text">{preparazione.preparazione}</p>
                <p className="card-text">{preparazione.tempoPreparazione}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Mostra un messaggio se non ci sono annunci */}
      {preparazioni.length === 0 && !error && (
        <p className="text-center">Non ci sono ricette al momento.</p>
      )}
    </div>
  );
}
  