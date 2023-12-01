import React from 'react';
import './Boton.css';
import imagen_antiboton from './logo_antiboton.png';

const Boton = ({ onClick }) => {
  return (
    <button className="mi-boton"  onClick={onClick}>
      <img
      src={imagen_antiboton}
      alt="Imagen del boton"
      style={{ width: '80%', height: '80%', objectFit: 'cover' }}
      />
    </button>
  );
}

export default Boton;

