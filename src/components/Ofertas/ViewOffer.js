import React, { useEffect, useState } from 'react';
import OfferCard from './OfferCard';
import MyOffers from './MyOffers';
import axios from 'axios';

const ViewOffer = () => {
    const [offers, setOffers] = useState([]);
    const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
    const username = localStorage.getItem('currentUser')

    useEffect(() => {
        const fetchOffers = async () => {
            const response = await fetch('http://localhost:5500/ofertas/jobOffers');
            if (!response.ok) {
                throw new Error(`Error al obtener las ofertas: ${response.statusText}`);
            }
            const data = await response.json();
            setOffers(data);
        };

        fetchOffers().catch(error => console.error(error));
    }, []);

    const handleSwipeLeft = () => {
        // Cambia a la siguiente oferta
        setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length);
    };

    const handleSwipeRight = async () => {
        // Agregar id de la oferta a localStorage si no está ya presente
        const myOffers = new Set(JSON.parse(localStorage.getItem('myOffers')) || []);
        myOffers.add(offers[currentOfferIndex].id);
        const job_offer_name = offers[currentOfferIndex].employer
        const job_offer_id = offers[currentOfferIndex].id
        localStorage.setItem('myOffers', JSON.stringify(Array.from(myOffers)));

    
        try {
            // Hacer una solicitud POST al servidor para crear un nuevo "match"
            const response = await axios.post('http://localhost:5500/match/matches', {username, job_offer_name, job_offer_id, match: false});
    
            console.log(response.data); // Imprime la respuesta del servidor
    
            // Cambia a la siguiente oferta después de que se haya actualizado localStorage
            setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length);
        } catch (error) {
            console.error(`Error al crear el match: ${error}`);
        }
    };
    
    
    
    return (
        <div className="offers-container">
            {offers.length > 0 && (
                <OfferCard 
                    offer={offers[currentOfferIndex]} 
                    onSwipeLeft={handleSwipeLeft} 
                    onSwipeRight={handleSwipeRight}
                />
            )}
        </div>
    );
};

export default ViewOffer;
