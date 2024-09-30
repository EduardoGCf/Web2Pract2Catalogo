import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const PeliculaDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.delete(`http://localhost:3000/api/peliculas/${id}`)
      .then(response => {
        console.log('Película eliminada:', response.data);
        navigate('/peliculas');  // Redirigir a la lista de películas después de eliminar
      })
      .catch(error => {
        console.error('Error al eliminar la película:', error);
      });
  }, [id, navigate]);

  return <div>Eliminando película...</div>;
};

export default PeliculaDelete;
