import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Shared/Button/Button';
import { Container } from '../../components/Shared/Container/Container';
import { Text } from '../../components/Shared/Text/Text';

import useAuth from '../../config/zustand/user';
export default function DefaultPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const url = user?.rol === 'profesor' ? '/menu/pedagogia' : '/menu/psicologia';
  return (
    <Container>
      <Text>NO HAY NADA AQUÍ</Text>
      <Button $width="16rem" $primary onClick={() => navigate(url)}>
        VOLVER AL MENÚ
      </Button>
    </Container>
  );
}
