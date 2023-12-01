import React, { useState } from 'react';
import './Home.css';
import logo from './pngpagina.png';
import featureImage from './imagenvertical2.png';
import fondo2 from './fondo3.png';
import miembro1 from './creadores.png';
import usuario from './usuario-opinion.png';
import botonopi from './botonopi.png'; // Importa la imagen del botón

const Home = () => {
  const [currentOpinion, setCurrentOpinion] = useState(0);

  const teamMembers = [
    { name: 'Ignacio Cuevas', image: miembro1 },
    { name: 'Martin Errazuriz', image: miembro1 },
    { name: 'Pedro Pablo Velasco', image: miembro1 },
  ];
  const OpinionImages = () => {
    return (
        <div className="home">
            <section className="hero">
                <h1>Bienvenido a DCOempleo</h1>
            </section>

            <section className="reviews">
                {/* Aquí puedes mapear un array de opiniones para mostrarlas */}
                <h2>Opiniones de nuestros usuarios</h2>
                <div className="review">“Esta aplicación ha cambiado mi vida. Nunca antes había encontrado una plataforma tan intuitiva y fácil de usar. ¡Definitivamente la recomendaría a todos mis amigos!” - Usuario Anonimo</div>
                <div className="review">“¡Impresionante! La atención al detalle y el compromiso con la experiencia del usuario realmente se destacan. No puedo esperar para ver qué nuevas características se añadirán en el futuro.” - Perico Tres Palotes</div>
                <div className="review">“He estado usando esta aplicación durante meses y no puedo expresar cuánto me ha ayudado. La interfaz es limpia y sencilla, y el equipo de soporte siempre está dispuesto a ayudar. ¡Sigan con el buen trabajo!” - Juan Perez</div>
            </section>
            <h2>Nuestro equipo</h2>
            <section className="team">

                {teamMembers.map((member, index) => (
                    <div key={index} className="team-card">
                        <img src={member.image} alt={member.name} className="team-image" />
                        <h3>{member.name}</h3>
                    </div>
                ))}
            </section>
        </div>
            <div className="opinion-images-container">
            <div className="image-with-name">
                <img src={miembro1} alt="Miembro 1" className="opinion-right-image" />
                <p className="member-name">Ignacio Cuevas</p>
            </div>
            <div className="image-with-name">
                <img src={miembro1} alt="Miembro 2" className="opinion-right-image" />
                <p className="member-name">Martin Errazuriz</p>
            </div>
            <div className="image-with-name">
                <img src={miembro1} alt="Miembro 3" className="opinion-right-image" />
                <p className="member-name">Pedro Pablo Velasco</p>
            </div>
            </div>
      </div>
    );
  };

  const opinions = [
    { text: 'Genial la aplicación', image: usuario },
    { text: 'Obtuve trabajo en tan solo 1 día', image: usuario },
    { text: 'Me encanta para trabajar', image: usuario },
    // ...más opiniones
  ];

 const nextOpinion = () => {
    setCurrentOpinion((currentOpinion + 1) % opinions.length);
  };

  const opinionBox = (
    <div className="content-box opinion-box">
        <h2 className="opinions-title">Reseñas</h2>
      <img src={opinions[currentOpinion].image} alt="Opinión" className="opinion-image" />
      <p className="opinion-text">{opinions[currentOpinion].text}</p>
      <img 
        src={botonopi} 
        alt="Siguiente Opinión" 
        className="next-opinion-button" 
        onClick={nextOpinion} 
      />
    </div>
  );

  const teamSection = (
    <div className="content-box team-section">
      <h2>Nuestro equipo</h2>
      <div className="team-members">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.image} alt={member.name} className="team-image" />
            <h3>{member.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="home" style={{ backgroundImage: `url(${fondo2})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}>
      <nav className="navigation">
        <img src={logo} alt="Logo" className="logo" />
      </nav>

      <section className="featured-image-section">
        <img src={featureImage} alt="Destacado" className="featured-image" />
      </section>

      <section className="hero">
        <h1>Bienvenido a nuestra aplicación</h1>
      </section>
      <section className="content-section">
        <div className="opinion-container">
            {opinionBox}
            <OpinionImages />
        </div>
      </section>
    </div>
  );
};

export default Home;