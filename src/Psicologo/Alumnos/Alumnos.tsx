import { Outlet, useNavigate } from 'react-router-dom';
import { Container } from '../../components/Shared/Container/Container';
import MultiTabs from '../../components/Shared/Multitabs/Multitabs';
import { useEffect } from 'react';

const tabs = [{ label: 'Listas', url: 'listas' }];

export default function AlumnosPsicologia() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('listas');
  }, []);
  return (
    <Container $width="100%" $direction="column">
      <MultiTabs tabs={tabs} />
      <Outlet></Outlet>
    </Container>
  );
}
