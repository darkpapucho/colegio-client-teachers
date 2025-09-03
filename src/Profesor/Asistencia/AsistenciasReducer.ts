import { AsistenciaAlumno } from '../../models/Alumno/types';
import { AsistenciaValue } from '../AsistenciaRecords/types';

export type AsistenciasReducerState = AsistenciaAlumno[];
type UpdateAsistenciaAction = {
  type: 'updateAsistencia';
  payload: {
    value: AsistenciaValue;
    alumnoId: string;
  };
};
type SetRegistroAction = {
  type: 'setRegistro';
  payload: AsistenciasReducerState;
};
export type AsistenciasReducerAction = UpdateAsistenciaAction | SetRegistroAction;
export default function AsistenciasReducer(state: AsistenciasReducerState, action: AsistenciasReducerAction) {
  switch (action.type) {
    case 'updateAsistencia': {
      const foundIndex = state.findIndex((record) => record.alumnoId === action.payload.alumnoId);
      if (foundIndex !== -1) {
        state[foundIndex].asistencia = action.payload.value;
      }
      break;
    }
    case 'setRegistro': {
      state = action.payload;
      return state;
    }
  }
}
