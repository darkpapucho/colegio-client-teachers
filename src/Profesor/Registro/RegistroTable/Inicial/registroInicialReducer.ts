import { RegistroNotasInicialProfesor } from '../../../../models/Profesor/types';
import { Nota, Periodo } from '../../../../types/gradoSalon';
import { ConvertPeriodoToIndex } from '../utils';

type SetRegistroAction = {
  type: 'setRegistro';
  payload: RegistroNotasInicialProfesor[];
};
type ClearRegistroAction = {
  type: 'clearRegistro';
};
type UpdateTardanzasInasistenciasAction = {
  type: 'updateTardanzasInasistencias';
  payload: {
    alumnoId: string;
    name: 'tardanzas' | 'inasistencias';
    type: 'justificadas' | 'injustificadas';
    value: number;
    periodo: Periodo;
  };
};
type UpdateNotaCursoAction = {
  type: 'updateNotaCurso';
  payload: {
    alumnoId: string;
    periodo: Periodo;
    cursoKey: string;
    nota: Nota;
    index: number;
  };
};
type UpdateConclusionesDescriptivasAction = {
  type: 'updateConclusionesDescriptivas';
  payload: {
    alumnoId: string;
    periodo: Periodo;
    data: string;
  };
};
export type RegistroInicialReducerAction =
  | UpdateTardanzasInasistenciasAction
  | UpdateNotaCursoAction
  | UpdateConclusionesDescriptivasAction
  | SetRegistroAction
  | ClearRegistroAction;
export default function RegistroInicialReducer(state: RegistroNotasInicialProfesor[], action: RegistroInicialReducerAction) {
  switch (action.type) {
    case 'setRegistro': {
      state = action.payload;
      return state;
    }
    case 'clearRegistro': {
      state = [];
      return state;
    }
    case 'updateTardanzasInasistencias': {
      const { alumnoId } = action.payload;
      const recordIndex = state.findIndex((record) => record.alumnoId === alumnoId);
      if (recordIndex == -1) return;
      state[recordIndex][action.payload.name]![action.payload.type][ConvertPeriodoToIndex(action.payload.periodo)] = action.payload.value;
      break;
    }
    case 'updateNotaCurso': {
      const { alumnoId, periodo, cursoKey, nota, index } = action.payload;
      const recordIndex = state.findIndex((record) => record.alumnoId === alumnoId);
      if (recordIndex == -1) return;
      state[recordIndex].cursos[cursoKey][periodo][index] = nota;
      break;
    }
    case 'updateConclusionesDescriptivas': {
      const { alumnoId, periodo, data } = action.payload;
      const recordIndex = state.findIndex((record) => record.alumnoId === alumnoId);

      if (recordIndex == -1) return;
      state[recordIndex].conclusionesDescriptivas![ConvertPeriodoToIndex(periodo)] = data;
      return state;
    }
  }
}
