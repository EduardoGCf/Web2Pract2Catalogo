import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RepartoManage = () => {
  const { id } = useParams(); // ID de la película que se está editando
  const [reparto, setReparto] = useState([]);
  const [personas, setPersonas] = useState([]); // Personas disponibles para agregar al reparto
  const [personaId, setPersonaId] = useState('');
  const [rol, setRol] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/reparto/pelicula/${id}`)
      .then(response => {
        console.log("Reparto data:", response.data); // Agrega esta línea
        setReparto(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al obtener el reparto');
        setLoading(false);
      });
      
    // Obtener la lista de todas las personas disponibles para el reparto
    axios.get('http://localhost:3000/api/personas')
      .then(response => {
        setPersonas(response.data);
      })
      .catch(err => {
        setError('Error al obtener la lista de personas');
      });
  
  }, [id]);
  

  const agregarAlReparto = (e) => {
    e.preventDefault();
    
    if (!personaId || !rol) {
      setError('Faltan datos para agregar al reparto');
      return;
    }
    
    axios.post('http://localhost:3000/api/reparto/asociar', {
      peliculaId: id,
      personaId: personaId,
      rol: rol
    })
    .then(response => {
      const nuevaPersona = response.data.persona; // Obtener la nueva persona del backend
      const nuevoRol = response.data.rol;
  
      // Actualizar el reparto con la nueva persona
      setReparto([...reparto, { Persona: nuevaPersona, rol: nuevoRol }]);
  
      // Resetear el formulario
      setPersonaId('');
      setRol('');
      setError(null);
    })
    .catch(err => {
      setError('Error al agregar al reparto');
    });
  };
  

  const eliminarPersona = (personaId) => {
    axios.post('http://localhost:3000/api/reparto/eliminar', {
      peliculaId: id,
      personaId: personaId
    })
      .then(() => {
        // Filtrar el reparto localmente después de eliminar
        setReparto(reparto.filter(persona => persona.Persona.id !== personaId));
      })
      .catch(err => {
        setError('Error al eliminar a la persona del reparto');
      });
  };
  const actualizarRol = (personaId, nuevoRol) => {
    console.log("personaId:", personaId, "rol:", nuevoRol); // Verifica si personaId está llegando como undefined
    if (!personaId || !nuevoRol) {
      setError('Faltan datos para actualizar el rol');
      return;
    }
  
    axios.post('http://localhost:3000/api/reparto/actualizar', {
      peliculaId: id,
      personaId: personaId,
      rol: nuevoRol
    })
      .then(() => {
        // Actualizar el rol en el estado local
        setReparto(reparto.map(persona =>
          persona.Persona.id === personaId ? { ...persona, rol: nuevoRol } : persona
        ));
      })
      .catch(err => {
        setError('Error al actualizar el rol');
      });
  };
  

  if (loading) {
    return <div>Cargando reparto...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>Gestionar Reparto de la Película</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      
      {/* Mostrar el reparto actual */}
      <h2>Reparto Actual</h2>
      <ul className="list-group mb-4">
  {reparto.map((item, index) => (
    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
      {item.Persona && (
        <div>
          <img src={item.Persona.foto} alt={item.Persona.nombre} className="img-thumbnail" style={{ width: '50px' }} />
          <span className="ms-2">{item.Persona.nombre} {item.Persona.apellido} - {item.rol || 'Sin rol asignado'}</span>
        </div>
      )}
      <div>
        {/* Campo para actualizar el rol */}
        <select
          value={item.rol || ''}
          onChange={(e) => actualizarRol(item.Persona?.id, e.target.value)} // Verificamos que Persona exista
          className="form-select form-select-sm me-2"
        >
          <option value="actor">Actor</option>
          <option value="director">Director</option>
          <option value="ambos">Ambos</option>
        </select>

        {/* Botón de eliminar */}
        <button className="btn btn-danger btn-sm" onClick={() => eliminarPersona(item.Persona?.id)}>
          Eliminar
        </button>
      </div>
    </li>
  ))}
</ul>

      {/* Formulario para agregar al reparto */}
      <h2>Agregar al Reparto</h2>
      <form onSubmit={agregarAlReparto}>
        <div className="mb-3">
          <label htmlFor="personaId" className="form-label">Persona</label>
          <select
            id="personaId"
            value={personaId}
            onChange={(e) => setPersonaId(e.target.value)}
            className="form-select"
          >
            <option value="">Seleccionar persona</option>
            {personas.map(persona => (
              <option key={persona.id} value={persona.id}>
                {persona.nombre} {persona.apellido}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="rol" className="form-label">Rol</label>
          <select
            id="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="form-select"
          >
            <option value="">Seleccionar rol</option>
            <option value="actor">Actor</option>
            <option value="director">Director</option>
            <option value="ambos">Ambos</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Agregar al Reparto</button>
      </form>
    </div>
  );
};

export default RepartoManage;
