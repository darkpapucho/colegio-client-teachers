import { Route } from 'react-router-dom';
import RequireRole from '../../components/Guards/RequireRole';
import PsicologoLayout from '../Layout/Layout';
import AlumnosPsicologia from '../Alumnos/Alumnos';
import ListasAlumnos from '../Alumnos/Listas/ListasAlumnos';
import AgendaPsicologia from '../Agenda/Agenda';
import AlumnoInfo from '../Alumnos/AlumnoInfo/AlumnoInfo';

const psicologoRoutes = (
  <Route element={<RequireRole allowedRoles={['psicologo']} fallback="/unauthorized" />} path="/menu">
    <Route element={<PsicologoLayout />} path="psicologia">
      <Route index element={<div>psicologo index</div>} />
      <Route element={<AlumnosPsicologia />} path="alumnos">
        <Route element={<ListasAlumnos />} path="listas"></Route>
      </Route>
      <Route element={<AgendaPsicologia />} path="agenda" />
      <Route path="alumno-info" element={<AlumnoInfo />} />
    </Route>
  </Route>
);

export default psicologoRoutes;
