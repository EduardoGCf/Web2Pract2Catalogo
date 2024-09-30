import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PeliculaCreate = () => {
  const [nombre, setNombre] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [imagen, setImagen] = useState('');
  const [fechaLanzamiento, setFechaLanzamiento] = useState('');
  const [calificacionRT, setCalificacionRT] = useState('');
  const [trailerYoutube, setTrailerYoutube] = useState('');
  const navigate = useNavigate();

  const crearPelicula = (e) => {
    e.preventDefault();

    // Validación simple antes de enviar
    if (!nombre || !fechaLanzamiento || !calificacionRT) {
      alert('Nombre, fecha de lanzamiento y calificación son obligatorios.');
      return;
    }

    // Enviar los datos a la API
    axios.post('http://localhost:3000/api/peliculas', {
      nombre,
      sinopsis,
      imagen,
      fechaLanzamiento,
      calificacionRT,
      trailerYoutube
    })
      .then(response => {
        // Redirigir a la lista de películas después de crear la nueva película
        navigate('/peliculas');
      })
      .catch(error => {
        console.error('Error al crear la película:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Agregar Nueva Película</h1>
      <form onSubmit={crearPelicula}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre de la Película</label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="sinopsis" className="form-label">Sinopsis</label>
          <textarea
            id="sinopsis"
            className="form-control"
            value={sinopsis}
            onChange={(e) => setSinopsis(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">URL de la Imagen</label>
          <input
            type="text"
            id="imagen"
            className="form-control"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="fechaLanzamiento" className="form-label">Fecha de Lanzamiento</label>
          <input
            type="date"
            id="fechaLanzamiento"
            className="form-control"
            value={fechaLanzamiento}
            onChange={(e) => setFechaLanzamiento(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="calificacionRT" className="form-label">Calificación Rotten Tomatoes (%)</label>
          <input
            type="number"
            id="calificacionRT"
            className="form-control"
            value={calificacionRT}
            onChange={(e) => setCalificacionRT(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="trailerYoutube" className="form-label">Trailer de YouTube (URL)</label>
          <input
            type="text"
            id="trailerYoutube"
            className="form-control"
            value={trailerYoutube}
            onChange={(e) => setTrailerYoutube(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success">Crear Película</button>
      </form>
    </div>
  );
};

export default PeliculaCreate;
