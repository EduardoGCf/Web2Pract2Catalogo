import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const PeliculaDetalle = () => {
  const { id } = useParams(); // Obtenemos el ID de la película desde la URL
  const [pelicula, setPelicula] = useState(null);
  const [directores, setDirectores] = useState([]);
  const [actores, setActores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener los detalles de la película
    axios.get(`http://localhost:3000/api/peliculas/${id}`)
      .then(response => setPelicula(response.data))
      .catch(error => setError('Error al obtener los detalles de la película'));

    // Obtener los directores de la película
    axios.get(`http://localhost:3000/api/reparto/pelicula/${id}/directores`)
      .then(response => setDirectores(response.data))
      .catch(error => setError('Error al obtener los directores'));

    // Obtener los actores de la película
    axios.get(`http://localhost:3000/api/reparto/pelicula/${id}/actores`)
      .then(response => setActores(response.data))
      .catch(error => setError('Error al obtener los actores'));
  }, [id]);
  const convertirEnlaceYouTube = (url) => {
    const videoId = url.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if (ampersandPosition !== -1) {
      return `https://www.youtube.com/embed/${videoId.substring(0, ampersandPosition)}`;
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!pelicula) {
    return <div>Cargando película...</div>;
  }

  return (
    <div className="container mt-4">
      <h1>{pelicula.nombre}</h1>
      <div className="row">
        <div className="col-md-4">
          <img src={pelicula.imagen} alt={pelicula.nombre} className="img-fluid" />
        </div>
        <div className="col-md-8">
          <p><strong>Fecha de lanzamiento:</strong> {new Date(pelicula.fechaLanzamiento).toLocaleDateString()}</p>
          <p><strong>Calificación:</strong> {pelicula.calificacionRT}%</p>
          <p><strong>Sinopsis:</strong> {pelicula.sinopsis}</p>
          
          <h2>Trailer</h2>
          <div className="embed-responsive embed-responsive-16by9">
          <iframe
              className="embed-responsive-item"
              src={convertirEnlaceYouTube(pelicula.trailerYoutube)} // Convertimos el enlace a formato embebido
              allowFullScreen
              title="Trailer"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h2>Directores</h2>
        {directores.length > 0 ? (
          <ul className="list-group">
            {directores.map((director) => {
              const personaId = director?.Persona?.id;
              return (
                <li key={personaId} className="list-group-item">
                  <img
                    src={director.Persona?.foto}
                    alt={director.Persona?.nombre}
                    className="img-thumbnail me-2"
                    style={{ width: '50px' }}
                  />
                  {personaId ? (
                    <Link to={`/actores/${personaId}`} className="text-decoration-none">
                      {director.Persona?.nombre} {director.Persona?.apellido}
                    </Link>
                  ) : (
                    <span>{director.Persona?.nombre} {director.Persona?.apellido}</span>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No hay directores disponibles.</p>
        )}

        <h2 className="mt-4">Actores</h2>
        {actores.length > 0 ? (
          <ul className="list-group">
            {actores.map((actor) => {
              const personaId = actor?.Persona?.id;
              return (
                <li key={personaId} className="list-group-item">
                  <img
                    src={actor.Persona?.foto}
                    alt={actor.Persona?.nombre}
                    className="img-thumbnail me-2"
                    style={{ width: '50px' }}
                  />
                  {personaId ? (
                    <Link to={`/actores/${personaId}`} className="text-decoration-none">
                      {actor.Persona?.nombre} {actor.Persona?.apellido}
                    </Link>
                  ) : (
                    <span>{actor.Persona?.nombre} {actor.Persona?.apellido}</span>
                  )}


                </li>
              );
            })}
          </ul>
        ) : (
          <p>No hay actores disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default PeliculaDetalle;
