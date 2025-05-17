import Table from '../../../../components/Shared/Table/Table';
import { nivelState } from '../../../../config/zustand/nivel';
import GetTableDataFromRegistro from '../utils';
import { RegistroInicialProfesor } from '../../../../models/Profesor/types';
import RegistroTableBody from './RegistroTableBody';
import RegistroTableHeader from './RegistroTableHeader';
import { Periodo } from '../../../../types/gradoSalon';

export default function RegistroTableInicial({ registro, periodo }: { periodo: Periodo; registro: RegistroInicialProfesor }) {
  const nivel = nivelState((state) => state.nivel);

  const { gridTemplateColumns, cursosList } = GetTableDataFromRegistro(registro, nivel!);
  if (registro.notas.length === 0) {
    return <>Lista vacía</>;
  }
  return (
    <Table $gridTempCols={gridTemplateColumns} $justifyContent="center" $alignItems="center" $height="30px">
      <RegistroTableHeader cursosList={cursosList} isTutor={registro.isTutor} />
      <RegistroTableBody periodo={periodo} registro={registro} cursosList={cursosList} />
    </Table>
  );
}
