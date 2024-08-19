import Alumno from '../models/Alumno/Alumno';
import { AsistenciaList } from '../models/Alumno/types';
import { AsistenciasReducerState } from '../Profesor/Asistencia/AsistenciasReducer';
import { Grado, Periodo, Seccion } from '../types/gradoSalon';
import { updateToken } from './axiosUtils';
import toaster from 'react-hot-toast';
export async function fetchAsistenciaList({ grado, seccion, month, day }: { day: number; grado: Grado | null; seccion: Seccion | null; month: string }) {
  if (!grado || !seccion) throw new Error('Debes seleccionar un grado y una sección');
  const response = await Alumno.fetchAsistenciaList({ grado, seccion, month, day });
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  //asigning default value "A": asistió
  return response.data.payload;
}

//update asistencia
export async function updateAsistenciaList({ registroAsistencia, dayId, periodo }: { dayId: string; periodo: Periodo; registroAsistencia: AsistenciasReducerState }) {
  const asistenciaList: AsistenciaList = {
    dayId,
    periodo,
    //eliminar nombreCompleto de los records
    list: registroAsistencia.map((record) => ({ alumnoId: record.alumnoId, asistencia: record.asistencia === '' ? 'A' : record.asistencia })),
  };
  const totalFaltas: number = asistenciaList.list.filter((record) => record.asistencia === 'F').length;
  const totalTardanzas: number = asistenciaList.list.filter((record) => record.asistencia === 'T').length;
  if (
    !window.confirm(
      `Estas seguro que deseas registrar la asistencia del ${new Date().toLocaleDateString('ES-es', { day: '2-digit', month: 'long' })}
      Faltas: ${totalFaltas}
      Tardanzas: ${totalTardanzas}
      `
    )
  )
    return;
  const response = await Alumno.updateAsistenciaList({ asistenciaList });
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  toaster.success('Se guardó la lista de asistencia');
}
