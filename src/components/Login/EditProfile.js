import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Formulario.css';

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const username = localStorage.getItem('currentUser');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/users/user/${username}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error(`Error al obtener el usuario: ${error}`);
      }
    };

    fetchUser();
  }, [username]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5500/users/user/${username}`,user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (response.status === 200) {
        alert("Perfil actualizado con éxito");
      } else {
        alert("Error al actualizar el perfil: " + response.data.error);
      }
    } catch (error) {
      alert("Error al actualizar el perfil: " + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5500/users/user/${username}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      if (response.status === 200) {
        alert("Perfil eliminado con éxito");
        localStorage.removeItem('currentUser'); // Eliminar el usuario del LocalStorage
        window.location.href = '/'; // Redirigir al usuario al inicio
      } else {
        alert("Error al eliminar el perfil: " + response.data.error);
      }
    } catch (error) {
      alert("Error al eliminar el perfil: " + error.message);
    }
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <form className="form" onSubmit={handleUpdate}>
      <h1>Editar Perfil</h1>
      <input type="text" value={user.name} onChange={e => setUser({...user, name: e.target.value})} placeholder="Username" />
      <input type="password" value={user.password} onChange={e => setUser({...user, password: e.target.value})} placeholder="Password" />
      <input type="description" value={user.description} onChange={e => setUser({...user, description: e.target.value})} placeholder="Insertar pequeña descrpcion" />
      <select name="gender" id="gender" className='dropdown' value={user.gender} onChange={e => setUser({...user, gender: e.target.value})}>
        <option value="male">Masculino</option>
        <option value="female">Femenino</option>
      </select>
      <select name="age" id="age" className='dropdown' value={user.age} onChange={e => setUser({...user, age: Number(e.target.value)})}>
        {Array.from(Array(100).keys()).map((age) => (
          <option key={age} value={age}>{age}</option>
        ))}
      </select>
      <button type="submit">Actualizar</button>
      <button type="button" onClick={handleDelete}>Eliminar Perfil</button>
    </form>
  );
};

export default EditProfile;
