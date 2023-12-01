import React, { useEffect, useState } from 'react';
import './SelectedEmployees.css';

const SelectedEmployees = () => {
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const username = localStorage.getItem('currentUser');

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem(`selectedEmployees_${username}`)) || [];
    setSelectedEmployees(employees);
  }, [username]);

  const handleDelete = (employeeId, jobOfferTitle) => {
    const updatedEmployees = selectedEmployees.filter(employee => 
      !(employee.id === employeeId && employee.jobOfferTitle === jobOfferTitle)
    );
    setSelectedEmployees(updatedEmployees);
    localStorage.setItem(`selectedEmployees_${username}`, JSON.stringify(updatedEmployees));
  };

  // Use a JavaScript Set to remove duplicates
  const uniqueEmployees = Array.from(new Set(selectedEmployees.map(JSON.stringify))).map(JSON.parse);

  return (
    <div className="selected-employees" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      <h2>Empleados seleccionados</h2>
      {uniqueEmployees.map((employee) => (
        <div className="employee-card" key={`${employee.id}_${employee.jobOfferTitle}`} style={{ flex: '0 0 auto', margin: '1em' }}>
          <img src={employee.image} alt={employee.name} className="employee-image" />
          <div className="employee-details">
            <h3>Nombre: {employee.name}</h3>
            <p>Descrpcion: {employee.description}</p>
            <p>Genero: {employee.gender}</p>
            <p>Edad: {employee.age}</p>
            <p>Oferta interesada: {employee.jobOfferTitle}</p>
          </div>
          <button onClick={() => handleDelete(employee.id, employee.jobOfferTitle)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

export default SelectedEmployees;
