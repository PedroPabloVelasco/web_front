import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Formulario.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('admin');
  const [gender, setGender] = useState('male');
  const [description, setDescription] = useState('');
  const [ age, setAge] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5500/users/registerUser', { username, password, type, description, gender, age }); // Enviar el tipo de usuario
      if (response.status === 201) {
        alert("Usuario creado con éxito");
        navigate('/'); // Redirige al usuario otra vez al login
      } else {
        alert("Error al crear el usuario: " + response.data.error);
      }
    } catch (error) {
      alert("Error al crear el usuario: " + error.message);
    }
  };
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Registro de Usuario</h1>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <select name="tipo" id="tipo" className='dropdown' value={type} onChange={e => setType(e.target.value)}> {/* Agregar el estado y el manejador de eventos al select */}
        <option value="admin">Administrador</option>
        <option value="empleado">Empleado</option>
        <option value="empleador">Empleador</option>
      </select>
      <input type="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Insertar pequeña descrpcion" />
      <select name="gender" id="gender" className='dropdown' value={gender} onChange={e => setGender(e.target.value)}> {/* Agregar el estado y el manejador de eventos al select */}
        <option value="male">Masculino</option>
        <option value="female">Femenino</option>
      </select>
      <select name="age" id="age" className='dropdown' value={age} onChange={e => setAge(Number(e.target.value))}>
  {Array.from(Array(100).keys()).map((age) => (	
    <option key={age} value={age}>{age}</option>	
  ))}
</select>

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
