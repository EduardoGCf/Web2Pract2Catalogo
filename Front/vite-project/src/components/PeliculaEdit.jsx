import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const PeliculaEdit = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [sinopsis, setSinopsis] = useState('');
  const [imagen, setImagen] = useState('');
  const [fechaLanzamiento, setFechaLanzamiento] = useState('');
  const [calificacionRT, setCalificacionRT] = useState('');
  const [trailerYoutube, setTrailerYoutube] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los datos de la película a editar
    axios.get(`http://localhost:3000/api/peliculas/${id}`)
      .then(response => {
        setNombre(response.data.nombre);
        setSinopsis(response.data.sinopsis);
        setImagen(response.data.imagen);
        setFechaLanzamiento(formatDate(response.data.fechaLanzamiento)); // Formatear fecha
        setCalificacionRT(response.data.calificacionRT);
        setTrailerYoutube(response.data.trailerYoutube);
      })
      .catch(error => {
        console.error('Error al obtener los detalles de la película:', error);
      });
  }, [id]);

  const actualizarPelicula = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/peliculas/${id}`, {
      nombre,
      sinopsis,
      imagen,
      fechaLanzamiento,
      calificacionRT,
      trailerYoutube
    })
      .then(response => {
        navigate('/peliculas');  // Redirigir a la lista de películas
      })
      .catch(error => {
        console.error('Error al actualizar la película:', error);
      });
  };

  // Función para formatear la fecha en "yyyy-MM-dd"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container mt-4">
      <h1>Editar Película</h1>
      <form onSubmit={actualizarPelicula}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre de la película</label>
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
          <label htmlFor="imagen" className="form-label">URL de la imagen</label>
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
          <label htmlFor="trailerYoutube" className="form-label">Trailer de YouTube</label>
          <input 
            type="text" 
            id="trailerYoutube" 
            className="form-control" 
            value={trailerYoutube} 
            onChange={(e) => setTrailerYoutube(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-success">Actualizar Película</button>
      </form>

      {/* Botón para gestionar el reparto de la película */}
      <div className="mt-4">
        <Link to={`/peliculas/${id}/reparto`} className="btn btn-secondary">Gestionar Reparto</Link>
      </div>
    </div>
  );
};

export default PeliculaEdit;
