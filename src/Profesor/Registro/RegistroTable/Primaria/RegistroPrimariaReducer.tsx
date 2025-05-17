import { Periodo } from '../../../../types/gradoSalon';
import { RecordNotas } from '../../../../types/notas';
import { ConvertPeriodoToIndex } from '../utils';

type SetRegisterAction = {
  type: 'set-register';
  payload: RecordNotas[];
};

type UpdateNotaCursoAction = {
  type: 'update-nota-curso';
  payload: { alumnoId: string; value: number; cursoKey: string; periodo: Periodo };
};

type UpdateConclusionesDescriptivas = {
  type: 'update-conclusiones-descriptivas';
  payload: { value: string; alumnoId: string; periodo: Periodo };
};
type UpdateConductaAlumno = {
  type: 'update-conducta-alumno';
  payload: { value: number; alumnoId: string; periodo: Periodo };
};
type UpdateConductaPPFF = {
  type: 'update-conducta-ppff';
  payload: { value: number; alumnoId: string; periodo: Periodo };
};
type UpdateTardanzaInasistencia = {
  type: 'update-tardanza-inasistencia';
  payload: { field: 'tardanzas' | 'inasistencias'; subfield: 'justificadas' | 'injustificadas'; value: number; periodo: Periodo; alumnoId: string };
};
export type RegistroPrimariaActions =
  | SetRegisterAction
  | UpdateNotaCursoAction
  | UpdateConclusionesDescriptivas
  | UpdateConductaAlumno
  | UpdateConductaPPFF
  | UpdateTardanzaInasistencia;

export default function RegistroPrimariaReducer(state: RecordNotas[], action: RegistroPrimariaActions) {
  const type = action.type;
  switch (type) {
    case 'set-register': {
      state = action.payload;
      return state;
    }
    case 'update-conclusiones-descriptivas': {
      const index = state.findIndex((row) => row.alumnoId === action.payload.alumnoId);

      state[index].conclusionesDescriptivas[ConvertPeriodoToIndex(action.payload.periodo)] = action.payload.value;

      return;
    }
    case 'update-nota-curso': {
      const { alumnoId, value, cursoKey, periodo } = action.payload;
      const index = state.findIndex((row) => row.alumnoId === alumnoId);

      const periodoIndex = ConvertPeriodoToIndex(periodo);

      state[index].cursos[cursoKey][periodoIndex] = value;
      return;
    }
    case 'update-conducta-alumno': {
      const { value, periodo, alumnoId } = action.payload;
      const index = state.findIndex((row) => row.alumnoId === alumnoId);

      state[index].conducta[ConvertPeriodoToIndex(periodo)] = value;

      return;
    }
    case 'update-conducta-ppff': {
      const index = state.findIndex((row) => row.alumnoId === action.payload.alumnoId);

      state[index].conductaPPFF[ConvertPeriodoToIndex(action.payload.periodo)] = action.payload.value;

      return;
    }
    default:
      return state;
  }
}
