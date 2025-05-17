import DisplayHoverMessage from '../../../../components/Shared/DisplayHoverMessage/DisplayHoverMessage';
import Table from '../../../../components/Shared/Table/Table';
import { CursoInfo } from '../../../../models/Profesor/types';
import CursoHeader from './CursoHeader';
import TardanzaAsistenciaHeader from '../TardanzaAsistenciaHeader';

export default function RegistroTableHeader({ cursosList, isTutor }: { isTutor: boolean; cursosList: CursoInfo[] }) {
  if (isTutor) {
    return (
      <Table.Header>
        <Table.Header.Item>Alumno</Table.Header.Item>
        {cursosList.map((curso) => (
          <Table.Header.Item key={curso.key}>
            <CursoHeader curso={curso} />
          </Table.Header.Item>
        ))}
        <Table.Header.Item>
          <TardanzaAsistenciaHeader label={'Tardanzas'} />
        </Table.Header.Item>
        <Table.Header.Item>
          <TardanzaAsistenciaHeader label={'Inasistencias'} />
        </Table.Header.Item>
        <Table.Header.Item>
          <DisplayHoverMessage width="100%" label="CT" message="Conclusiones Descriptivas"></DisplayHoverMessage>
        </Table.Header.Item>
      </Table.Header>
    );
  } else {
    return (
      <Table.Header>
        <Table.Header.Item>Alumno</Table.Header.Item>
        {cursosList.map((curso) => (
          <Table.Header.Item key={curso.key}>
            <CursoHeader curso={curso} />
          </Table.Header.Item>
        ))}
      </Table.Header>
    );
  }
}
