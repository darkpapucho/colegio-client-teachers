import { Route } from 'react-router-dom';
import DefaultPage from '../../pages/DefaultPage/DefaultPage';
import AsistenciaDiaria from '../Asistencia/AsistenciaDiaria/AsistenciaDiaria';
import AsistenciaGeneral from '../Asistencia/AsistenciaGeneral/AsistenciaGeneral';
import Asistencias from '../Asistencia/Asistencias';
import AsistenciaAlumnos from '../AsistenciaRecords/AsistenciaAlumnos';
import Board from '../Board/Board';
import CambiarPassword from '../CambiarPassword/CambiarPassword';
import GenerarLibretas from '../GenerarLibretas/GenerarLibretas';
import IndexTeacher from '../IndexTeacher/Index';
import PensionesByGradoSeccion from '../Pensiones/PorSalon/PensionesByGradoSeccion';
import Registro from '../Registro/Registro';
import TeacherLayout from '../Layout/TeacherLayout';
import RequireRole from '../../components/Guards/RequireRole';
import MisSalones from '../MisSalones/MisSalones';

export const teacherRoutes = (
  <Route element={<RequireRole allowedRoles={['profesor']} fallback="/unauthorized" />} path="/menu">
    <Route path="pedagogia" element={<TeacherLayout />}>
      <Route element={<IndexTeacher />} index />
      <Route element={<Registro />} path="registro"></Route>
      <Route element={<Asistencias />} path="asistencias">
        <Route element={<AsistenciaDiaria />} path="diaria" />
        <Route element={<AsistenciaGeneral />} path="general" />
      </Route>
      <Route element={<AsistenciaAlumnos />} path="lista-asistencia" />
      <Route element={<CambiarPassword />} path="cambiar-password" />
      <Route element={<Board />} path="board" />
      <Route element={<PensionesByGradoSeccion />} path="pensiones" />
      <Route element={<GenerarLibretas />} path="generar-libretas" />
      <Route element={<MisSalones />} path="mis-salones" />
      <Route path="*" element={<DefaultPage />} />
    </Route>
  </Route>
);
