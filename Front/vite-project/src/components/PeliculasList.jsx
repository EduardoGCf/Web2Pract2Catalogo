import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PeliculasList = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Hook para navegar programáticamente

  useEffect(() => {
    axios.get('http://localhost:3000/api/peliculas/list')  // Usamos la nueva ruta para la lista simplificada
      .then(response => {
        setPeliculas(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al obtener las películas. Inténtalo de nuevo.');
        setLoading(false);
      });
  }, []);

  // Función para eliminar una película
  const eliminarPelicula = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta película?')) {
      axios.delete(`http://localhost:3000/api/peliculas/${id}`)
        .then(() => {
          // Actualizar la lista de películas después de eliminar
          setPeliculas(peliculas.filter(pelicula => pelicula.id !== id));
          alert('Película eliminada con éxito.');
        })
        .catch(err => {
          alert('Error al eliminar la película.');
        });
    }
  };

  // Función para navegar a los detalles de la película
  const verDetalles = (id) => {
    navigate(`/peliculas/${id}`);
  };

  // Función para navegar a la edición de la película
  const editarPelicula = (id) => {
    navigate(`/peliculas/editar/${id}`);
  };

  if (loading) {
    return <div className="text-center">Cargando películas...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Lista de Películas</h1>
      <button onClick={() => navigate('/peliculas/nueva')} className="btn btn-success mb-4">Agregar nueva película</button>
      <div className="row">
        {peliculas.map(pelicula => (
          <div key={pelicula.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={pelicula.imagen} alt={pelicula.nombre} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{pelicula.nombre}</h5>
                <p className="card-text">{pelicula.sinopsis.substring(0, 200)}...</p>  {/* Mostramos una parte de la sinopsis */}
                <p className="card-text">Calificacion {pelicula.calificacionRT}%</p>
                <p className="card-text">{new Date(pelicula.fechaLanzamiento).toLocaleDateString()}</p>
              </div>
              <div className="card-footer">
                <div className="d-flex justify-content-between">
                  <button className="btn btn-primary me-2" onClick={() => verDetalles(pelicula.id)}>Ver Detalles</button>
                  <button className="btn btn-warning me-2" onClick={() => editarPelicula(pelicula.id)}>Editar</button>
                  <button className="btn btn-danger" onClick={() => eliminarPelicula(pelicula.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeliculasList;
