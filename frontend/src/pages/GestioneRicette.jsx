import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function GestioneRicette() {
  const [titolo, setTitolo] = useState('');
  const [ingredienti, setIngredienti] = useState([]);
  const [preparazione, setPreparazione] = useState('');
  const [tempoPreparazione, setTempoPreparazione] = useState('');
  const [immagine, setImmagine] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [preparazioni, setPreparazioni] = useState([]);
  const [editingId, setEditingId] = useState("");

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
          console.log(error.message);
        }
      };
  
      fetchPreparazioni();
    }, []);
  
    const handleEdit = async (id) => {
      try {
        const response = await fetch(`http://localhost:5001/api/ricette/ricette/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Autenticazione
          },
        });
        
        if (!response.ok) throw new Error('Errore nel caricamento della ricetta da modificare.');
        
        const data = await response.json();
    
        // Popola i campi con i dati della ricetta
        setTitolo(data.titolo);
        setIngredienti(data.ingredienti.join(', ')); // Se è un array di ingredienti, lo trasformiamo in una stringa
        setPreparazione(data.preparazione);
        setTempoPreparazione(data.tempoPreparazione);
        setImmagine(null); // Non possiamo settare l'immagine direttamente nel form
        setEditingId(data._id);
      } catch (error) {
        console.log('Errore durante la modifica della ricetta:', error.message);
        setMessage('Errore durante la modifica della ricetta.');
      }
    };
    
  const handleImageChange = (e) => {
    setImmagine(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('titolo', titolo);
    formData.append('ingredienti', ingredienti); // È una stringa separata da virgole
    formData.append('preparazione', preparazione);
    formData.append('tempoPreparazione', tempoPreparazione);
    if (immagine) {
      formData.append('immagine', immagine);
    }
  
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId 
        ? `http://localhost:5001/api/ricette/ricette/${editingId}` 
        : 'http://localhost:5001/api/ricette/ricette';
  
      const response = await fetch(url, {
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) throw new Error('Errore durante la creazione/modifica della ricetta');
      
      const data = await response.json();
      
      if (editingId) {
        // Aggiorna l'elenco delle ricette dopo la modifica
        setPreparazioni((prevPreparazioni) => 
          prevPreparazioni.map((ricetta) => (ricetta._id === editingId ? data : ricetta))
        );
        setMessage('Ricetta modificata con successo!');
      } else {
        // Aggiungi la nuova ricetta alla lista
        setPreparazioni([...preparazioni, data]);
        setMessage('Ricetta creata con successo!');
      }
  
      // Resetta i campi del form
      setTitolo('');
      setIngredienti('');
      setPreparazione('');
      setTempoPreparazione('');
      setImmagine(null);
      setEditingId(null);
      navigate('/ricette');
    } catch (error) {
      setMessage('Errore durante la creazione/modifica della ricetta.');
      console.log(error.message);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questa ricetta?")) {
      try {
        const response = await fetch(`http://localhost:5001/api/ricette/ricette/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (!response.ok) throw new Error('Errore durante l\'eliminazione della ricetta.');
  
        setPreparazioni(preparazioni.filter((ricetta) => ricetta._id !== id));
        setMessage('Ricetta eliminata con successo!');
      } catch (error) {
        setMessage('Errore durante l\'eliminazione della ricetta.');
        console.log(error.message);
      }
    }
  };
  

  return (
    <div className="container">
      <h2>Gestione Ricette</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Titolo</label>
          <input
            type="text"
            className="form-control"
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Ingredienti (separati da virgola)</label>
          <textarea
            className="form-control"
            value={ingredienti}
            onChange={(e) => setIngredienti(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Preparazione</label>
          <textarea
            className="form-control"
            value={preparazione}
            onChange={(e) => setPreparazione(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Tempo di preparazione</label>
          <input
            type="text"
            className="form-control"
            value={tempoPreparazione}
            onChange={(e) => setTempoPreparazione(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Immagine</label>
          <input type="file" className="form-control" onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-primary">
          Pubblica Ricetta
        </button>
      </form>
      {message && <p>{message}</p>}

      <h2 className="mt-5">Ricette esistenti</h2>
      {preparazioni.map((preparazione) => (
        <div key={preparazione._id} className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{preparazione.titolo}</h5>
            <p className="card-text">{preparazione.ingredienti}</p>
            <p className="card-text">{preparazione.preparazione}</p>
            <p className="card-text">{preparazione.tempoPreparazione}</p>
            <button className="btn btn-warning me-2" onClick={() => handleEdit(preparazione._id)}>
              Modifica
            </button>
            <button className="btn btn-danger" onClick={() => handleDelete(preparazione._id)}>
              Elimina
            </button>
          </div>
        </div>
      ))}
    </div>
  );

}
