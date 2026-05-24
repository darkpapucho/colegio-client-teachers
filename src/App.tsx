import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import RequireAuth from './components/Guards/RequireAuth';
import { teacherRoutes } from './Profesor/Routes/TeacherRoutes';
import psicologoRoutes from './Psicologo/Routes/PsicologoRoutes';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/unauthorized" element={<div>"desautorizado</div>} />

      <Route element={<RequireAuth />}>
        {psicologoRoutes}
        {teacherRoutes}
      </Route>
    </Routes>
  );
}

export default App;
