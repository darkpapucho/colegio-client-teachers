import { FaEye } from 'react-icons/fa';
import Layout from '../../pages/Layout/Layout';

const psicologoMenuItems = [
  {
    label: 'Alumnos',
    url: 'alumnos',
    icon: <FaEye />,
  },
  {
    label: 'Agenda',
    url: 'agenda',
    icon: <FaEye />,
  },
];

export default function PsicologoLayout() {
  return <Layout menuItems={psicologoMenuItems} />;
}
