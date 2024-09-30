import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ActorDetalle = () => {
  const { id } = useParams(); // Obtenemos el ID de la persona desde la URL
  const [persona, setPersona] = useState(null);
  const [peliculas, setPeliculas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener los detalles de la persona
    axios.get(`http://localhost:3000/api/personas/${id}`)
      .then(response => {
        setPersona(response.data);
      })
      .catch(error => {
        setError('Error al obtener los detalles de la persona');
        console.error(error);
      });

    // Obtener las películas en las que participa esta persona
    axios.get(`http://localhost:3000/api/personas/${id}/peliculas`)
      .then(response => {
        setPeliculas(response.data);
      })
      .catch(error => {
        setError('Error al obtener las películas de la persona');
        console.error(error);
      });
  }, [id]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!persona) {
    return <div>Cargando información de la persona...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>{persona.nombre} {persona.apellido}</h1>
      <div className="row">
        <div className="col-md-4">
          <img src={persona.foto} alt={persona.nombre} className="img-fluid" />
        </div>
        <div className="col-md-8">
          <h2>Biografía</h2>
          <p>{persona.biografia}</p>
        </div>
      </div>

      <h2 className="mt-5">Películas en las que participa</h2>

      {peliculas.length > 0 ? (
        <ul className="list-group">
          {peliculas.map((pelicula) => (
            <li key={pelicula.id} className="list-group-item">
              <img
                    src={pelicula.imagen}
                    alt={pelicula.nombre}
                    className="img-thumbnail me-2"
                    style={{ width: '50px' }}
                  />
              <Link to={`/peliculas/${pelicula.id}`}>
                <strong>{pelicula.nombre}</strong>
              </Link>
              <p>
  <strong>Rol: </strong> 
  {pelicula.Reparto.rol === 'ambos' ? 'Director - Actor' : pelicula.Reparto.rol}
</p>

            </li>
          ))}
        </ul>
      ) : (
        <p>No hay películas disponibles para esta persona.</p>
      )}
    </div>
  );
};

export default ActorDetalle;
