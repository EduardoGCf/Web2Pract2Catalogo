import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/usuarios/registrar', { nombre, correo, contraseña })
      .then(response => {
        console.log('Usuario registrado:', response.data);
      })
      .catch(error => {
        console.error('Error al registrar usuario:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      <div>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div>
        <label>Correo:</label>
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
      </div>
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;
