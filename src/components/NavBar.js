import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import logo from './pngpagina.png';

function NavBar() {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userType, setUserType] = useState();

    const handleLogoClick = () => {
        localStorage.removeItem('accessToken');
        setOpen(false);
        setIsRotating(!isRotating);
        setTimeout(() => {
            setIsRotating(false);
            setTimeout(() => setIsRotating(true), 10);
        }, 50);
      };
    
    const [isRotating, setIsRotating] = useState(false);



    useEffect(() => {
        setIsLoggedIn(location.pathname !== '/' && location.pathname !== '/signup' && location.pathname !== '/login' && location.pathname !== '/about');

        // Fetch user type from the server
        fetch('http://localhost:5500/users/user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                let currentUserProfile = data.filter(profile => profile.name === localStorage.getItem('currentUser'))[0];
                setUserType(currentUserProfile ? currentUserProfile.type : 'Unknown');
            })
        }
    )
    return (
        <nav className="navbar">
            <Link to="/" className="nav-logo" onClick={handleLogoClick}>
                <img src={logo} alt="LOGO" className={`nav-logo ${isRotating ? 'rotating' : ''}`} />
            </Link>
            <div className="nav-title">
                <h2>DCOempleo</h2>
            </div>
            {isLoggedIn ? (

                userType === 'empleado' ? (
                <ul className="nav-links">
                    <li className="nav-item">
                        <Link to="/viewoffer" className="nav-link" onClick={() => setOpen(false)}>
                            Pagina Principal
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/MyOffers" className="nav-link" onClick={() => setOpen(false)}>
                            Mis Ofertas
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/editprofile" className="nav-link" onClick={() => setOpen(false)}>
                            Editar Perfil
                        </Link>
                    </li>
                </ul>
                ): 
                
                userType === 'empleador' ? (
                <ul className="nav-links">
                    <li className="nav-item">
                        <Link to="/principal" className="nav-link" onClick={() => setOpen(false)}>
                            Pagina Principal
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/JobOffer" className="nav-link" onClick={() => setOpen(false)}>
                            Crear Oferta
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/myofferscreated" className="nav-link" onClick={() => setOpen(false)}>
                            Mis Ofertas Creadas
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/selectedemployees" className="nav-link" onClick={() => setOpen(false)}>
                            Empleados Seleccionados
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/editprofile" className="nav-link" onClick={() => setOpen(false)}>
                            Editar Perfil
                        </Link>
                    </li>
                </ul>
                ) : (
                <ul className="nav-links">
                    <li className="nav-item">
                        <Link to="/viewoffer" className="nav-link" onClick={() => setOpen(false)}>
                            Pagina Principal
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/JobOffer" className="nav-link" onClick={() => setOpen(false)}>
                            Crear Oferta
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/viewoffer" className="nav-link" onClick={() => setOpen(false)}>
                            Ver Ofertas
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/MyOffers" className="nav-link" onClick={() => setOpen(false)}>
                            Mis Ofertas
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/editprofile" className="nav-link" onClick={() => setOpen(false)}>
                            Editar Perfil
                        </Link>
                    </li>
                </ul>
                )
                
            ) : (
                <div className="nav-auth-buttons">
                    <ul className="nav-links">
                        <li className="nav-item">
                            <Link to="/about" className="auth-button" onClick={() => setOpen(false)}>
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/signup" className="auth-button" onClick={() => setOpen(false)}>
                                Registrarse
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="auth-button" onClick={() => setOpen(false)}>
                                Iniciar Sesión
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}

export default NavBar;
