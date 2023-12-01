import React, { useEffect, useState } from 'react';
import './MyOffers.css';

const MyOffers = () => {
  const [myOffers, setMyOffers] = useState([]);
  const username = localStorage.getItem('currentUser');

  useEffect(() => {
    // Obtener las ofertas de localStorage y convertirlas en un array si es necesario
    let offers = localStorage.getItem(`myOffers_${username}`);
    offers = offers ? JSON.parse(offers) : [];
    // Use a Set to remove any duplicate offers based on their ID
    const uniqueOffers = Array.from(new Set(offers.map(offer => offer.id)))
      .map(id => {
        return offers.find(offer => offer.id === id);
      });
    setMyOffers(uniqueOffers);
  }, [username]);

  return (
    <div className="my-offers">
      <h2>Mis Ofertas Favoritas</h2>
      {myOffers.map((offer) => (
        <div className="offer-card" key={offer.id}>
          <h3>{offer.title}</h3>
          <p>{offer.description}</p>
          <p>{offer.company}</p>
          <p>{offer.location}</p>
          <p>Salario: {offer.salary}</p>
        </div>
      ))}
    </div>
  );
};

export default MyOffers;
