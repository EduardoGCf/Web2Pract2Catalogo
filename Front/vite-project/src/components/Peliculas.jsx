import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/api/peliculas')  // Cambia esta URL según tu API
      .then(response => {
        setPeliculas(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener las películas:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Cargando películas...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {peliculas.map(pelicula => (
          <div key={pelicula.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={pelicula.imagen} alt={pelicula.nombre} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{pelicula.nombre}</h5>
                <p className="card-text">{pelicula.sinopsis.substring(0, 100)}...</p>
                {/* Mostrar la calificación de Rotten Tomatoes */}
                <h6>Calificación : {pelicula.calificacionRT}%</h6>
              </div>
              <div className="card-footer">
                <Link to={`/peliculas/${pelicula.id}`} className="btn btn-primary">Ver detalles</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Peliculas;
