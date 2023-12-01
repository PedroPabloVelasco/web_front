import React, { useState } from 'react';
import './tarjeta.css';
import BotonLike from './boton_like';
import Boton from './Boton';

const Tarjeta = ({ elementos }) => {
  const [indice, setIndice] = useState(0);

  const siguienteElemento = () => {
    setIndice((indice + 1) % elementos.length);
  };

  const anteriorElemento = () => {
    setIndice((indice - 1 + elementos.length) % elementos.length);
  };

  return (
    <div className="tarjeta">
      <div className="contenido">
        <h2>Instrucciones</h2>
        <p>{elementos[indice]}</p>
      </div>
      <BotonLike onClick={siguienteElemento}/><Boton onClick={anteriorElemento}/>
    </div>
  );
};

export default Tarjeta;



