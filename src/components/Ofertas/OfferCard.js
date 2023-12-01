import React, { useState } from 'react';
import './OfferCard.css';

function OfferCard({ offer, onSwipeLeft, onSwipeRight}) { // Asegúrate de pasar el username como prop
  const [startX, setStartX] = useState(null);
  const [action, setAction] = useState(null);
  const username = localStorage.getItem('currentUser');

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setAction(null); 
  };

  const handleMouseMove = (e) => {
    if (startX === null) return;

    const deltaX = e.clientX - startX;

    if (deltaX < -50) {
      onSwipeLeft();
      setAction('rejected');
      setStartX(null);
    } else if (deltaX > 50) {
      onSwipeRight();
      setAction('like');
      setStartX(null);

      // Guardar la oferta en el LocalStorage cuando el usuario hace "like"
      const myOffers = JSON.parse(localStorage.getItem(`myOffers_${username}`)) || []; // Usar una clave que incluya el username
      myOffers.push(offer);
      localStorage.setItem(`myOffers_${username}`, JSON.stringify(myOffers)); // Usar una clave que incluya el username
    }
  };

  const handleMouseUp = () => {
    setStartX(null);
    setTimeout(() => setAction(null), 500); 
  };

  return (
    <div
      className="offer-card-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="offer-card">
        <div className="offer-card-notch"></div> {/* Simulación del notch */}
        <div className="offer-card-inner">
          <h2 className='offer-title'>{offer.title}</h2>
          <p className="offer-description">Descripcion: {offer.description}</p>
          <p className="offer-company">Compañia: {offer.company}</p>
          <p className="offer-location">Ubicacion: {offer.location}</p>
          <p className="offer-salary">Salario: {offer.salary}</p>
        </div>
        {action && (
          <div className={`action-message ${action}`} style={{ opacity: startX === null ? 1 : 0 }}>
            {action === 'like' ? 'Like' : 'Rechazado'}
          </div>
        )}
      </div>
    </div>
  );
}

export default OfferCard;
