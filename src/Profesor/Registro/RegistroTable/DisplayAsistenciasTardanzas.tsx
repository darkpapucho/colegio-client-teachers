import styled from 'styled-components';
import { Container } from '../../../components/Shared/Container/Container';
import { Periodo } from '../../../types/gradoSalon';
import { ConvertPeriodoToIndex } from './utils';
import { Tardanzas } from '../../../models/Profesor/types';
// import { ChangeEvent, useContext } from 'react';
// import { RegistroContext } from '../Registro';
const StyledContainer = styled(Container)`
  > input[type='number'] {
    width: 100%;
    height: 100%;

    outline: none;
    border: none;
    text-align: center;
  }
`;
export default function DisplayAsistenciasTardanzas({
  record,
  periodo,
}: // alumnoId,
// name,
{
  record: Tardanzas;
  periodo: Periodo;
  // alumnoId: string;
  // name: 'tardanzas' | 'inasistencias';
}) {
  // const { dispatch } = useContext(RegistroContext)!;

  return (
    <Container $width="100%" $height="100%">
      <StyledContainer $width="50%" className="border-right" $justifyContent="center" $height="100%" $alignItems="center">
        {
          // <input
          //   onChange={(event) => onChange(event, 'justificadas')}
          //   type="number"
          //   defaultValue={record.justificadas[ConvertPeriodoToIndex(periodo)]}
          //   min={0}
          //   max={15}
          // />

          record.justificadas[ConvertPeriodoToIndex(periodo)]
        }
      </StyledContainer>
      <StyledContainer $width="50%" $justifyContent="center" $alignItems="center" $height="100%">
        {
          // <input
          //   onChange={(event) => onChange(event, 'injustificadas')}
          //   type="number"
          //   defaultValue={record.injustificadas[ConvertPeriodoToIndex(periodo)]}
          //   min={0}
          //   max={15}
          // />
          record.injustificadas[ConvertPeriodoToIndex(periodo)]
        }
      </StyledContainer>
    </Container>
  );
  // function onChange(event: ChangeEvent<HTMLInputElement>, type: 'justificadas' | 'injustificadas') {
  //   dispatch({
  //     type: 'updateTardanzasInasistencias',
  //     payload: {
  //       alumnoId,
  //       name,
  //       type,
  //       value: +event.target.value,
  //       periodo,
  //     },
  //   });
  // }
}
