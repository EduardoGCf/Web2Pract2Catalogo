import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PersonaCreate = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [biografia, setBiografia] = useState('');
  const [foto, setFoto] = useState('');
  const navigate = useNavigate();

  const crearPersona = (e) => {
    e.preventDefault();
    
    // Validación simple antes de enviar
    if (!nombre || !apellido) {
      alert('El nombre y apellido son obligatorios.');
      return;
    }

    // Enviar los datos a la API
    axios.post('http://localhost:3000/api/personas', {
      nombre,
      apellido,
      biografia,
      foto
    })
      .then(response => {
        // Redirigir a la lista de personas después de crear la nueva persona
        navigate('/personas');
      })
      .catch(error => {
        console.error('Error al crear la persona:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h1>Agregar Nueva Persona</h1>
      <form onSubmit={crearPersona}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre</label>
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
          <label htmlFor="apellido" className="form-label">Apellido</label>
          <input 
            type="text" 
            id="apellido" 
            className="form-control" 
            value={apellido} 
            onChange={(e) => setApellido(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="biografia" className="form-label">Biografía</label>
          <textarea 
            id="biografia" 
            className="form-control" 
            value={biografia} 
            onChange={(e) => setBiografia(e.target.value)} 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="foto" className="form-label">URL de la Foto</label>
          <input 
            type="text" 
            id="foto" 
            className="form-control" 
            value={foto} 
            onChange={(e) => setFoto(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-success">Crear Persona</button>
      </form>
    </div>
  );
};

export default PersonaCreate;
