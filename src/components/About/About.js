import React from 'react';
import BotonLike from './boton_like';
import Boton from './Boton';
import Tarjeta from './tarjeta';

const elementos = ["Si buscan un trabajo", "Solo registrate", "Busca", "Acepta con boton verde", "Rechaza con boton rojo"];



function About() {
    return (
        <div>
        <p><Tarjeta elementos={elementos}/></p>
            
            
        </div>
        
    );
}


export default About;
