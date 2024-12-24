import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login/Login';
import Menu from './pages/Menu/Menu';
import RequireProfesor from './components/Guards/RequireProfesor';
import Registro from './Profesor/Registro/Registro';
import Asistencias from './Profesor/Asistencia/Asistencias';
import CambiarPassword from './Profesor/CambiarPassword/CambiarPassword';
import MenuIndex from './pages/Menu/MenuIndex';
import DefaultPage from './pages/DefaultPage/DefaultPage';
import AsistenciaAlumnos from './Profesor/AsistenciaRecords/AsistenciaAlumnos';
import Board from './Profesor/Board/Board';
import PensionesByGradoSeccion from './Profesor/Pensiones/PorSalon/PensionesByGradoSeccion';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/menu" element={<Menu />}>
        <Route element={<RequireProfesor />}>
          <Route element={<MenuIndex />} index></Route>
          <Route element={<Registro />} path="registro" />
          <Route element={<Asistencias />} path="asistencias" />
          <Route element={<AsistenciaAlumnos />} path="lista-asistencia" />
          <Route element={<CambiarPassword />} path="cambiar-password" />
          <Route element={<Board />} path="board" />
          <Route element={<PensionesByGradoSeccion />} path="pensiones" />
          <Route path="*" element={<DefaultPage />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
