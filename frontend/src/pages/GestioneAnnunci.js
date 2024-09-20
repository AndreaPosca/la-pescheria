import React, { useState, useEffect } from "react";

export default function GestioneAnnunci() {
  const [titolo, setTitolo] = useState("");
  const [contenuto, setContenuto] = useState("");
  const [immagine, setImmagine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [annunci, setAnnunci] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchAnnunci = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/annunci/annunci");

        if (!response.ok) {
          throw new Error("Errore nel caricamento degli annunci.");
        }

        const data = await response.json();
        setAnnunci(data); // Popola la lista degli annunci con i dati ricevuti dal server
      } catch (error) {
        console.error('Errore nel caricamento degli annunci:', error);
      }
    };

    fetchAnnunci();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    const formData = new FormData();
    formData.append("titolo", titolo);
    formData.append("contenuto", contenuto);
    if (immagine) {
      formData.append("media", immagine); // Aggiungi l'immagine se presente
    }
    console.log(formData);
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
    
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId 
      ? `http://localhost:5001/api/annunci/annunci/${editingId}` 
      : 'http://localhost:5001/api/annunci/annunci';

      const response = await fetch(url, {
        method,
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) throw new Error("Errore durante l'operazione");
  
      const data = await response.json();

      if (editingId) {
        setAnnunci((prevAnnunci) =>
          prevAnnunci.map((annuncio) => (annuncio._id === editingId ? data.announcement : annuncio))
        );
        setMessage('Annuncio modificato con successo!');
        
      } else {
        setAnnunci([...annunci, data]);
        setMessage('Annuncio creato con successo!');
      }

    } catch (error) {
      setMessage(`Errore durante l'invio: ${error.message}`);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleEdit = (id) => {
    const annuncio = annunci.find((a) => a._id === id);
    setTitolo(annuncio.titolo);
    setContenuto(annuncio.contenuto);
    setImmagine(null);
    setEditingId(id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Sei sicuro di voler eliminare questo annuncio?")) {
      try {
        const response = await fetch(`http://localhost:5001/api/annunci/annunci/${id}`, {    
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Errore durante l'eliminazione dell'annuncio.");

        setAnnunci(annunci.filter((annuncio) => annuncio._id !== id));
        setMessage("Annuncio eliminato con successo!");
      } catch (error) {
        setMessage("Si è verificato un errore durante l'eliminazione.");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImmagine(file);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Gestione Annunci</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Titolo Annuncio</label>
          <input
            type="text"
            className="form-control"
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descrizione Annuncio</label>
          <textarea
            className="form-control"
            value={contenuto}
            onChange={(e) => setContenuto(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Immagine (Opzionale)</label>
          <input type="file" className="form-control" onChange={handleImageChange} />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Invio in corso..." : editingId ? "Modifica Annuncio" : "Pubblica Annuncio"}
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}

      <h2 className="mt-5">Annunci esistenti</h2>
      {annunci.map((annuncio) => (
        <div key={annuncio._id} className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{annuncio.titolo}</h5>
            <p className="card-text">{annuncio.contenuto}</p>
            <button className="btn btn-warning me-2" onClick={() => handleEdit(annuncio._id)}>
              Modifica
            </button>
            <button className="btn btn-danger" onClick={() => handleDelete(annuncio._id)}>
              Elimina
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
