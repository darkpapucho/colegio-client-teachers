import { useState } from 'react';
import { Container } from '../../components/Shared/Container/Container';
import { Text } from '../../components/Shared/Text/Text';
import { theme } from '../../config/styled/styled';
import { nivelState } from '../../config/zustand/nivel';
import useCurrentPeriodo from '../../hooks/useCurrentPeriodo';
import { Nivel, Periodo } from '../../types/gradoSalon';
import { convertPeriodoKeyToLabel } from '../../utils/periodo';
import RegistroTableInicial from './RegistroTable/Inicial/RegistroTableInicial';
import RegistroTablePrimaria from './RegistroTable/Primaria/RegistroTablePrimaria';

export default function Registro() {
  const { currentPeriodo } = useCurrentPeriodo();
  const periodo = (currentPeriodo || 'primerPeriodo') as Periodo;
  const [isYearOver, _setIsYearOver] = useState(false);
  const nivel = nivelState((state) => state.nivel) as Nivel;
  console.log({ periodo, nivel });
  if (isYearOver) {
    return <h1>El año escolar a concluido.</h1>;
  }
  if (!currentPeriodo) {
    return <>No existe un periodo activo dentro del calendario escolar.</>;
  }
  return (
    <>
      <Container $direction="column" $width="100%" $gap="2rem" $padding="0 0 3rem 0">
        {currentPeriodo && (
          <Container $bgColor={theme.colors.tertiary.light} $width="100%" $padding="1rem">
            <Text $primary $large $fontWeight="700">
              {convertPeriodoKeyToLabel(periodo as Periodo)}
            </Text>
          </Container>
        )}
        {nivel === 'inicial' ? <RegistroTableInicial /> : <RegistroTablePrimaria periodo={periodo} />}
      </Container>
    </>
  );

  //functions
}
