import React from 'react';
import './BotonRedondo.css';
import imagenboton from './imagenboton.png';

const BotonLike = ({ onClick }) => {
  return (
    <button className="boton-redondo"  onClick={onClick}>
      <img
      src={imagenboton}
      alt="Imagen del boton"
      style={{ width: '80%', height: '80%', objectFit: 'cover' }}
      />
    </button>
  );
}

export default BotonLike;
