import React, { useState, useEffect } from 'react'; // Importa useEffect
import { useNavigate } from 'react-router-dom';
import './JobOffer.css';

const JobOffer = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('currentUser');

    const [form, setForm] = useState({
        title: '',
        company: '',
        description: '',
        location: '',
        salary: 0,
        employer: username
    });

    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (success) {
            alert('Formulario enviado correctamente');
            navigate('/principal');
        }
    }, [success, navigate]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setError({
            ...error,
            [e.target.name]: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};
        for (let field in form) {
            if (!form[field]) {
                errors[field] = `Por favor completa el campo ${field}`;
            }
        }
        if (Object.keys(errors).length === 0) {
            setSuccess(true);
    
            // Aquí es donde enviamos los datos al backend
            console.log(form); // Imprime los datos del formulario en la consola
            const response = await fetch('http://localhost:5500/ofertas/jobOffers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                // Si la respuesta no es ok, lanzamos un error
                const errorData = await response.json(); // Intenta parsear la respuesta como JSON
                throw new Error(`Error al enviar el formulario: ${errorData.message}`);
            }
    
            const data = await response.json(); // Aquí puedes manejar la respuesta de tu API
        }
        setError(errors);
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <h1>Crear Oferta de Trabajo</h1>
                <label>
                    Título: <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Introduce el título" />
                    {error.title && <p className="error">{error.title}</p>}
                </label>
                <br />
                <label>
                    Descripción: <textarea name="description" value={form.description} onChange={handleChange} placeholder="Introduce la descripción" />
                    {error.description && <p className="error">{error.description}</p>}
                </label>
                <br />
                <label>
                    Empresa: <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Introduce la empresa" />
                    {error.company && <p className="error">{error.company}</p>}
                </label>
                <br />
                <label>
                    Ubicación: <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="Introduce la ubicación" />
                    {error.location && <p className="error">{error.location}</p>}
                </label>
                <br />
                <label>
                    Salario: 
                    <input type="number" name="salary" min="500000" max="4000000" step="500000" value={form.salary} onChange={handleChange} placeholder="Introduce el salario" />
                    {error.salary && <p className="error">{error.salary}</p>}
                </label>
                <br />

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
};

export default JobOffer;
