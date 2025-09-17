import { Fragment } from 'react/jsx-runtime';
import Table from '../../../../components/Shared/Table/Table';
import { AsistenciasReducerAction, AsistenciasReducerState } from '../../AsistenciasReducer';
import AsistenciaPicker from './AsistenciaPicker';
import { AsistenciaAlumno } from '../../../../models/Alumno/types';
import { Container } from '../../../../components/Shared/Container/Container';
import { theme } from '../../../../config/styled/styled';

export default function AsistenciasTable({ alumnos, dispatch }: { dispatch: React.Dispatch<AsistenciasReducerAction>; alumnos: AsistenciasReducerState }) {
  return (
    <Table $gridTempCols="45px 360px 45px" $justifyContent="center" $alignItems="center" $headerPadding="5px" $height="24px">
      <Table.Header>
        <Table.Header.Item>N°</Table.Header.Item>
        <Table.Header.Item>Alumno</Table.Header.Item>
        <Table.Header.Item>Asist.</Table.Header.Item>
      </Table.Header>
      <Table.Body>
        {alumnos.map((record, index) => (
          <Fragment key={index}>
            <Table.Body.Item>
              <Container $pointer $width="100%" $padding="0 1rem 0 0" $justifyContent="right" onClick={() => onClickAlumnoName(record)}>
                {index + 1}
              </Container>
            </Table.Body.Item>
            <Table.Body.Item>
              <Container $pointer $width="100%" $padding="0 1rem 0 0" $justifyContent="right" onClick={() => onClickAlumnoName(record)}>
                {record.nombreCompleto}
              </Container>
            </Table.Body.Item>
            <Table.Body.Item>
              <Container $width="100%" $bgColor={theme.colors.secondary.normal} $height="100%">
                <AsistenciaPicker key={record.asistencia} alumnoId={record.alumnoId} value={record.asistencia === '' ? 'A' : record.asistencia} />
              </Container>
            </Table.Body.Item>
          </Fragment>
        ))}
      </Table.Body>
    </Table>
  );

  function onClickAlumnoName(record: AsistenciaAlumno) {
    // if (record.asistencia === 'T') return;
    dispatch({ type: 'updateAsistencia', payload: { alumnoId: record.alumnoId, value: getNextAsistenciaValue(record.asistencia === '' ? 'A' : record.asistencia) } });
  }

  function getNextAsistenciaValue(asistenciaValue: 'A' | 'F' | 'T') {
    if (asistenciaValue === 'A') {
      return 'F';
    } else if (asistenciaValue === 'F') {
      return 'T';
    } else if (asistenciaValue === 'T') {
      return 'A';
    } else {
      throw new Error('invalid asistencia value');
    }
  }
}
