import { BiSpreadsheet, BiCalendarCheck, BiFoodMenu } from 'react-icons/bi';
import { CiMoneyCheck1 } from 'react-icons/ci';
import { PiUserList } from 'react-icons/pi';
import SideBar from '../../pages/Layout/SideBar';
import { MenuItem } from '../../pages/Layout/sidebar/SideBarItem';
import { SiGoogleclassroom } from 'react-icons/si';
const teacherMenuItems: MenuItem[] = [
  { label: 'Registro Notas', url: 'registro', icon: <BiSpreadsheet /> },
  { label: 'Pasar Asistencias', url: 'asistencias', icon: <BiCalendarCheck /> },
  { label: 'Registro Asistencias', url: 'lista-asistencia', icon: <PiUserList /> },
  { label: 'Asignaciones', url: '', icon: <BiFoodMenu /> },
  { label: 'Pensiones', url: 'pensiones', icon: <CiMoneyCheck1 /> },
  { label: 'Board', url: 'board', icon: <BiFoodMenu /> },
  { label: 'Generar Libretas', url: 'generar-libretas', icon: <BiFoodMenu /> },
  { label: 'Mis Salones', url: 'mis-salones', icon: <SiGoogleclassroom /> },
];
export default function TeacherSideBar() {
  return <SideBar menuItems={teacherMenuItems} />;
}
