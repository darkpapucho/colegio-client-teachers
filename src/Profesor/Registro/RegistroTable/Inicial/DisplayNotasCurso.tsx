import styled from 'styled-components';
import { Container } from '../../../../components/Shared/Container/Container';
import { Nota, Periodo } from '../../../../types/gradoSalon';

import Select from '../../../../components/Shared/Select/Select';
import useCustomEvent from '../../../../hooks/useCustomEvent';
import { useContext } from 'react';

import { CursoRegistro } from '../../../../models/Profesor/types';
import { SELECT_NOTAS } from '../../../../var/selectOptions';
import { theme } from '../../../../config/styled/styled';
import { RegistroContext } from './RegistroTableInicial';

const DisplayNotasCursoContainer = styled(Container)`
  height: 100%;

  &:last-child {
    border-right: none;
  }
`;

export default function DisplayNotasCurso({ curso, periodo, alumnoId, cursoKey }: { curso: CursoRegistro; periodo: Periodo; alumnoId: string; cursoKey: string }) {
  const width = `${100 / curso.numCompetencias}%`;
  const { dispatch } = useContext(RegistroContext)!;
  useCustomEvent('customSelect', listener);
  return (
    <Container $width="100%" $padding="0" $height="100%">
      {curso[periodo].map((nota: Nota | '', index) => {
        return (
          <DisplayNotasCursoContainer key={index} $width={width} $justifyContent="center" className="border-right" $alignItems="center">
            <Select
              rect
              heigth="100%"
              small
              width="100%"
              options={SELECT_NOTAS}
              defaultValue={{ label: nota === '' ? '-' : nota, value: nota }}
              label="nota"
              name={`updateNota-${alumnoId}-${cursoKey}-${index}`}
              bgColor={nota === '' ? 'white' : theme.colors.green.normal}
            />
          </DisplayNotasCursoContainer>
        );
      })}
    </Container>
  );
  function listener(event: CustomEvent) {
    const { name, value } = event.detail;
    const params: string[] = name.split('-');

    if (params[0] === 'updateNota') {
      dispatch({
        type: 'updateNotaCurso',
        payload: {
          alumnoId: params[1],
          cursoKey: params[2],
          nota: value,
          periodo,
          index: +params[3],
        },
      });
    }
  }
}
