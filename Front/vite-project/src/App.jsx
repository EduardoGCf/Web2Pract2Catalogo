import { Routes, Route } from 'react-router-dom';
import Peliculas from './components/Peliculas';
import PersonaList from './components/PersonaList';  // Componente para mostrar la lista de personas
import PeliculaDetalle from './components/PeliculaDetalle';
import ActorDetalle from './components/ActorDetalle';
import Login from './components/Login';
import Register from './components/Register';
import PeliculasList from './components/PeliculasList';
import PeliculaCreate from './components/PeliculaCreate';
import PeliculaEdit from './components/PeliculaEdit';
import RepartoManage from './components/RepartoManage'; 
import Header from './components/Header';  // Importamos el Header
import PersonaCreate from './components/PersonaCreate';
import PersonaEdit from './components/PersonaEdit';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header /> {/* Agregamos el Header para que aparezca en todas las rutas */}
      
      <Routes>
        <Route path="/" element={<Peliculas />} />
      
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Gestión del Reparto */}
        <Route path="/peliculas/:id/reparto" element={<RepartoManage />} />

      {/* Ruta para el catálogo de películas */}
      <Route path="/" element={<Peliculas />} />
      {/*rutas de peliculas*/}
      <Route path="/peliculas" element={<PeliculasList />} />
        <Route path="/peliculas/nueva" element={<PeliculaCreate />} />
        <Route path="/peliculas/editar/:id" element={<PeliculaEdit />} />
        <Route path="/peliculas/:id" element={<PeliculaDetalle />} />
      {/* Rutas para la gestión de personas */}
      <Route path="/actores/:id" element={<ActorDetalle />} />
        <Route path="/personas" element={<PersonaList />} />
        <Route path="/personas/nueva" element={<PersonaCreate />} />
        <Route path="/personas/editar/:id" element={<PersonaEdit />} />
      </Routes>
    </div>
  );
}

export default App;
