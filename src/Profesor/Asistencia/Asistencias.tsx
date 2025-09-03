import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '../../components/Shared/Container/Container';
import MultiTabs from '../../components/Shared/Multitabs/Multitabs';
import { useEffect } from 'react';

const asistenciasTabs = [
  { label: 'Diaria', url: 'diaria' },
  { label: 'General', url: 'general' },
];

export default function Asistencias() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('diaria');
  }, []);
  return (
    <Container $direction="column" $gap="2rem" $width="100%">
      <MultiTabs tabs={asistenciasTabs}></MultiTabs>

      <Container $padding="2rem 0" $direction="column" $height="max-content">
        <Outlet></Outlet>
      </Container>
    </Container>
  );
}
