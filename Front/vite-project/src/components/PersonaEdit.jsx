import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PersonaEdit = () => {
  const { id } = useParams();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [biografia, setBiografia] = useState('');
  const [foto, setFoto] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener los datos de la persona a editar
    axios.get(`http://localhost:3000/api/personas/${id}`)
      .then(response => {
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
        setBiografia(response.data.biografia);
        setFoto(response.data.foto);
      })
      .catch(error => {
        console.error('Error al obtener los detalles de la persona:', error);
      });
  }, [id]);

  const actualizarPersona = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/api/personas/${id}`, {
      nombre,
      apellido,
      biografia,
      foto
    })
      .then(response => {
        navigate('/personas');  // Redirigir a la lista de personas
      })
      .catch(error => {
        console.error('Error al actualizar la persona:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Editar Persona</h1>
      <form onSubmit={actualizarPersona}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
          <input type="text" id="nombre" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input type="text" id="apellido" className="form-control" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label htmlFor="biografia" className="form-label">Biografía</label>
          <textarea id="biografia" className="form-control" value={biografia} onChange={(e) => setBiografia(e.target.value)}></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="foto" className="form-label">URL de Foto</label>
          <input type="text" id="foto" className="form-control" value={foto} onChange={(e) => setFoto(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-success">Actualizar Persona</button>
      </form>
    </div>
  );
};

export default PersonaEdit;
