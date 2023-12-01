import React, { useState } from 'react';
import './ProfileCard.css';

function ProfileCard({ profile, onSwipeLeft, onSwipeRight }) {
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

      // Guardar el perfil en el LocalStorage cuando el usuario hace "like"
      const selectedEmployees = JSON.parse(localStorage.getItem(`selectedEmployees_${username}`)) || [];
      selectedEmployees.push(profile);
      localStorage.setItem(`selectedEmployees_${username}`, JSON.stringify(selectedEmployees));
    }
  };

  const handleMouseUp = () => {
    setStartX(null);
    setTimeout(() => setAction(null), 500); 
  };

  return (
    <div
      className="profile-card-container" // Aplica la clase al contenedor
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="profile-card">
        <div className="profile-card-inner">
          <img src={profile.image} alt={profile.name} className="profile-image" />
          <div className="profile-details">
            <h2>Nombre: {profile.name}</h2>
            <p>Descrpcion: {profile.description}</p>
            <p>Genero: {profile.gender}</p>
            <p>Edad: {profile.age}</p>
            <p>Oferta interesada: {profile.jobOfferTitle}</p>
          </div>
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

export default ProfileCard;
