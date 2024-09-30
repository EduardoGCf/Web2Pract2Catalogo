import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/api/usuarios/login', { correo, contraseña })
      .then(response => {
        console.log('Usuario logueado:', response.data);
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      <div>
        <label>Correo:</label>
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} />
      </div>
      <div>
        <label>Contraseña:</label>
        <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;
