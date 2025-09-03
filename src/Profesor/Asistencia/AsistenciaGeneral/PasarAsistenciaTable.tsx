import { Fragment } from 'react/jsx-runtime';
import { Container } from '../../../components/Shared/Container/Container';
import { AsistenciaAlumno } from '../../../models/Alumno/types';
import AsistenciaPicker from '../AsistenciaDiaria/AsistenciasTable/AsistenciaPicker';
import { AsistenciasReducerAction, AsistenciasReducerState } from '../AsistenciasReducer';
import Table from '../../../components/Shared/Table/Table';
import { Text } from '../../../components/Shared/Text/Text';
import { AlumnoNameContainer } from './AlumnoNameContainer';

export default function PasarAsistenciasTable({ alumnos, dispatch }: { dispatch: React.Dispatch<AsistenciasReducerAction>; alumnos: AsistenciasReducerState }) {
  //$justifyContent="center" $alignItems="center" $headerPadding="5px"$height="30px"

  return (
    <Table $gridTempCols="30px 340px 40px" $width="content-fit">
      <Table.Header>
        <Table.Header.Item>
          <Text $small $fontWeight="bold">
            N°
          </Text>
        </Table.Header.Item>
        <Table.Header.Item>
          <Text $small $fontWeight="bold">
            Alumno
          </Text>
        </Table.Header.Item>
        <Table.Header.Item>
          <Text $small $fontWeight="bold">
            Asis.
          </Text>
        </Table.Header.Item>
      </Table.Header>
      <Table.Body>
        {alumnos.map((record, index) => (
          <Fragment key={index}>
            <Table.Body.Item>
              <Container $justifyContent="center" $height="22px" $padding="0 0 0 4px">
                {index + 1}
              </Container>
            </Table.Body.Item>
            <Table.Body.Item>
              <AlumnoNameContainer
                $pointer={record.asistencia == undefined ? false : true}
                $width="100%"
                $padding="0 1rem 0 0"
                $height="22px"
                $justifyContent="right"
                onClick={() => onClickAlumnoName(record)}
                $alignItems="center">
                <Text $fontSize="11px">{record.nombreCompleto}</Text>
              </AlumnoNameContainer>
            </Table.Body.Item>
            <Table.Body.Item>
              <AsistenciaPicker key={record.asistencia} alumnoId={record.alumnoId} value={record.asistencia} />
            </Table.Body.Item>
          </Fragment>
        ))}
      </Table.Body>
    </Table>
  );

  function onClickAlumnoName(record: AsistenciaAlumno) {
    if (record.asistencia == undefined) return;
    // if (record.asistencia === 'T') return;
    dispatch({ type: 'updateAsistencia', payload: { alumnoId: record.alumnoId, value: getNextAsistenciaValue(record.asistencia) } });
  }

  function getNextAsistenciaValue(asistenciaValue: 'A' | 'F' | 'T' | '') {
    if (asistenciaValue === '') {
      return 'A';
    } else if (asistenciaValue === 'A') {
      return 'F';
    } else if (asistenciaValue === 'F') {
      return 'T';
    } else if (asistenciaValue === 'T') {
      return '';
    } else {
      throw new Error('invalid asistencia value');
    }
  }
}
