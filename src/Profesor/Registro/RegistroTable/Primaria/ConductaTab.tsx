import { Periodo } from '../../../../types/gradoSalon';
import NotaCell from './NotaCell';

export default function ConductaTab({ alumnoId, periodo, initValue, field }: { field: 'alumno' | 'PPFF'; alumnoId: string; periodo: Periodo; initValue: number }) {
  return <NotaCell width="100%" type="conducta" alumnoId={alumnoId} periodo={periodo} initValue={initValue} field={field}></NotaCell>;
}
