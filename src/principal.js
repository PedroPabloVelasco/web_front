import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileCard from './components/Ofertas/ProfileCard';

function PaginaPrincipal() {
  const [profiles, setProfiles] = useState([]);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isMatch, setIsMatch] = useState(false); // Nuevo estado para controlar la 


  // Cuando el componente se monta, realiza una solicitud a la API para obtener los perfiles de los empleados
  useEffect(() => {
    fetch('http://localhost:5500/ofertas/employeeProfiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      body: JSON.stringify({
        employerName: localStorage.getItem('currentUser')
      })
    })
      .then(response => response.json())
      .then(data => {
        const employeeProfiles = data.filter(profile => profile.type === 'empleado');
        setProfiles(employeeProfiles);
      })
      .catch(error => console.error(error));
  }, []);
  

  const handleSwipeLeft = () => {
    setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    setIsMatch(false); // Oculta el mensaje cuando se desliza a la izquierda
  };

  const handleSwipeRight = async () => {
    // Obtén el perfil actual
    const profile = profiles[currentProfileIndex];
  
    try {
      // Hacer una solicitud POST al servidor para actualizar el "match"
      const response = await axios.post('http://localhost:5500/match/updateMatch', {
        job_offer_name: localStorage.getItem('currentUser'),
        job_offer_id: profile.jobOfferId
      });
  
      setIsMatch(true); // Muestra el mensaje cuando se produce un "match"
          // Oculta el mensaje después de 5 segundos
      setTimeout(() => {
      setIsMatch(false);
    }, 3000);
    } catch (error) {
      console.error(`Error al actualizar el match: ${error}`);
    }
  
    // Cambia a la siguiente oferta después de que se haya actualizado el "match"
    setCurrentProfileIndex((prevIndex) => (prevIndex + 1) % profiles.length);
  };
  

  return (
    <div>
      {isMatch && <h1 style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '3em', color: 'blue', zIndex: 1000 }}>¡Es un MATCH!</h1>}
      {profiles.length > 0 && (
        <ProfileCard
          profile={profiles[currentProfileIndex]}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />
      )}
    </div>
  );
  
}

export default PaginaPrincipal;