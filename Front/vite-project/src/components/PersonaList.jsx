import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PersonaList = () => {
  const [personas, setPersonas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener la lista de personas desde la API
    axios.get('http://localhost:3000/api/personas')
      .then(response => {
        setPersonas(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error al obtener la lista de personas');
        setLoading(false);
      });
  }, []);

  const eliminarPersona = (id) => {
    axios.delete(`http://localhost:3000/api/personas/${id}`)
      .then(() => {
        setPersonas(personas.filter(persona => persona.id !== id));
      })
      .catch(error => {
        setError('Error al eliminar la persona');
      });
  };

  if (loading) {
    return <div>Cargando personas...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Lista de Personas</h1>
      <Link to="/personas/nueva" className="btn btn-primary mb-3">Agregar Persona</Link>
      <ul className="list-group">
        {personas.map(persona => (
          <li key={persona.id} className="list-group-item d-flex justify-content-between align-items-center">
            {persona.nombre} {persona.apellido}
            <div>
              <Link to={`/personas/editar/${persona.id}`} className="btn btn-warning btn-sm mx-2">Editar</Link>
              <button onClick={() => eliminarPersona(persona.id)} className="btn btn-danger btn-sm">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonaList;
