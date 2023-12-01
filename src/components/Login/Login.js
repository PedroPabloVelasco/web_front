import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Formulario.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [, setUserType] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5500/users/loginUser', { username, password });
      if (response.status === 200) {

        const token = response.data.access_token;

        // Almacena el token en el localStorage
        localStorage.setItem('accessToken', token);

        // Almacena el username en el localStorage
        localStorage.setItem('currentUser', username);
        
        axios.get('http://localhost:5500/users/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
            let data = response.data;
            let currentUserProfile = data.filter(profile => profile.name === localStorage.getItem('currentUser'))[0];
            const userType = currentUserProfile ? currentUserProfile.type : 'Unknown';
            setUserType(userType);

            if (userType === "empleado") {
              navigate('/viewoffer')
            }
            else if (userType === "empleador"||userType === "admin") {
              navigate('/principal')
            }
        })
        .catch(error => console.error('Error:', error));
      } else if (response.status === 401) {
        throw new Error(response.data.error);
      } else {
        throw new Error("Error desconocido al iniciar sesión");
      }
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }
  };
  

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Inicio de sesión</h1>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
