import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyOffersCreated.css';

const MyOffersCreated = () => {
  const [offers, setOffers] = useState([]);
  const username = localStorage.getItem('currentUser');
  const [editOfferId, setEditOfferId] = useState(null);
  const [editedOffer, setEditedOffer] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/ofertas/jobOffers`);
        const allOffers = response.data;
        const myOffers = allOffers.filter(offer => offer.employer === username);
        setOffers(myOffers);
      } catch (error) {
        console.error(`Error al obtener las ofertas: ${error}`);
      }
    };

    fetchOffers();
  }, [username]);

  const handleEdit = (offerId) => {
    setEditOfferId(offerId);
    const offerToEdit = offers.find(offer => offer.id === offerId);
    setEditedOffer(offerToEdit);
  };

  const handleUpdate = async (offerId) => {
    try {
      await axios.put(`http://localhost:5500/ofertas/jobOffers/${offerId}`, editedOffer);
      const updatedOffers = offers.map(offer => offer.id === offerId ? editedOffer : offer);
      setOffers(updatedOffers);
      setEditOfferId(null); // Salir del modo de edición después de actualizar
    } catch (error) {
      console.error(`Error al actualizar la oferta: ${error}`);
    }
  };

  const handleDelete = async (offerId) => {
    try {
      await axios.delete(`http://localhost:5500/ofertas/jobOffers/${offerId}`);
      const updatedOffers = offers.filter(offer => offer.id !== offerId);
      setOffers(updatedOffers);
    } catch (error) {
      console.error(`Error al eliminar la oferta: ${error}`);
    }
  };

  return (
    <div className="my-offers-created">
      <h2>Mis Ofertas Creadas</h2>
      {offers.map((offer) => (
        <div className="offer-card" key={offer.id}>
          {editOfferId === offer.id ? (
            <>
              <label>Titulo:</label>
              <input type="text" defaultValue={offer.title} onChange={(e) => setEditedOffer({...editedOffer, title: e.target.value})} />
              <label>Descripcion:</label>
              <textarea defaultValue={offer.description} onChange={(e) => setEditedOffer({...editedOffer, description: e.target.value})} />
              <label>Compañia:</label>
              <input type="text" defaultValue={offer.company} onChange={(e) => setEditedOffer({...editedOffer, company: e.target.value})} />
              <label>Ubicacion:</label>
              <input type="text" defaultValue={offer.location} onChange={(e) => setEditedOffer({...editedOffer, location: e.target.value})} />
              <label>Salario:</label>
              <input type="text" defaultValue={offer.salary} onChange={(e) => setEditedOffer({...editedOffer, salary: e.target.value})} />
              <button onClick={() => handleUpdate(offer.id)}>Aceptar</button>
            </>
          ) : (
            <>
              <h3>Titulo: {offer.title}</h3>
              <p>Descripcion: {offer.description}</p>
              <p>Compañia: {offer.company}</p>
              <p>Ubicacion: {offer.location}</p>
              <p>Salario: {offer.salary}</p>
              <button onClick={() => handleEdit(offer.id)}>Editar</button>
              <button onClick={() => handleDelete(offer.id)}>Eliminar</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyOffersCreated;
