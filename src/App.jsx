import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Index from './components/Index';
import Bombas from './components/Bombas';
import Plantas from './components/Plantas';
import Stats from './components/Stats';
import BaseLayout from './components/BaseLayout';
import Signup from './components/signup';
import ContadorDiarioBombeo from './components/ContadorDiarioBombeo';
import ContadorDiarioKwh from './components/ContadorDiarioKwh';
import ConsumoDiarioBombeo from './components/ConsumoDiarioBombeo';
import ConsumoDiarioKwh from './components/ConsumoDiarioKwh';
import UsuariosTotales from './components/UsuariosTotales';
import ConsumoUsuarios from './components/ConsumoUsuarios';
import M3Facturados from './components/M3Facturados';
import ConsM3Facturados from './components/ConsM3Facturados';
import M3Perdidos from './components/M3Perdidos';
import EficienciaBombeo from './components/EficienciaBombeo';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/" />
              : <Login setIsAuthenticated={setIsAuthenticated} />
          }
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/"
          element={
            isAuthenticated
              ? <BaseLayout setIsAuthenticated={setIsAuthenticated}><Index /></BaseLayout>
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/bombas"
          element={
            isAuthenticated
              ? <BaseLayout setIsAuthenticated={setIsAuthenticated}><Bombas /></BaseLayout>
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/plantas"
          element={
            isAuthenticated
              ? <BaseLayout setIsAuthenticated={setIsAuthenticated}><Plantas /></BaseLayout>
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/stats"
          element={
            isAuthenticated
              ? <BaseLayout setIsAuthenticated={setIsAuthenticated}><Stats /></BaseLayout>
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/metros-cubicos-facturados"
          element={
            isAuthenticated
              ? <BaseLayout setIsAuthenticated={setIsAuthenticated}><M3Facturados /></BaseLayout>
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/consumo-m3-facturados"
          element={
            isAuthenticated
              ? <BaseLayout setIsAuthenticated={setIsAuthenticated}><ConsM3Facturados /></BaseLayout>
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/metros-cubicos-perdidos"
          element={
            isAuthenticated
              ? <BaseLayout setIsAuthenticated={setIsAuthenticated}><M3Perdidos /></BaseLayout>
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/eficiencia-bombeo"
          element={
            isAuthenticated
              ? <BaseLayout setIsAuthenticated={setIsAuthenticated}><EficienciaBombeo /></BaseLayout>
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/ContadorDiarioBombeo"
          element={
            isAuthenticated
              ? <BaseLayout setIsAuthenticated={setIsAuthenticated}><ContadorDiarioBombeo /></BaseLayout>
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/ContadorDiarioKwh"
          element={
            isAuthenticated
              ? <BaseLayout setIsAuthenticated={setIsAuthenticated}><ContadorDiarioKwh /></BaseLayout>
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/ConsumoDiarioBombeo"
          element={
            isAuthenticated
              ? <BaseLayout setIsAuthenticated={setIsAuthenticated}><ConsumoDiarioBombeo /></BaseLayout>
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/ConsumoDiarioKwh"
          element={
            isAuthenticated
              ? <BaseLayout setIsAuthenticated={setIsAuthenticated}><ConsumoDiarioKwh /></BaseLayout>
              : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
