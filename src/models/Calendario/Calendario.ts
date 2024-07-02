import axios from 'axios';
import setupAxiosInterceptorsTo, { AxiosResponseSchema } from '../../config/axios/axios';
import { API_URL } from '../../var/envData';
import { API_END_POINTS } from '../../config/axios/endPoints';
import { Grado, Periodo, Seccion } from '../../types/gradoSalon';
import { AsistenciaRecord } from '../../Profesor/AsistenciaRecords/types';
import { MONTH_NAME } from '../../Profesor/AsistenciaRecords/utils';
setupAxiosInterceptorsTo(axios);
export default class Calendario {
  static async getRecordAsistenciaAlumnos({ periodo, grado, seccion }: { periodo: Periodo; grado: Grado; seccion: Seccion }) {
    const response = await axios.post<
      AxiosResponseSchema<{
        asistencias: { nombreCompleto: string; alumnoId: string; records: AsistenciaRecord[] }[];
        availableDays: { month: MONTH_NAME; day: number }[];
      }>
    >(API_URL + API_END_POINTS.getRecordAsistenciaAlumnos, { grado, seccion, periodo });
    return response;
  }
  static async fetchCurrentPeriodo() {
    const response = await axios.get<AxiosResponseSchema<string>>(API_URL + API_END_POINTS.fetchCurrentPeriodo);
    return response;
  }
  static async convertDateToPeriodo() {
    const response = await axios.get<AxiosResponseSchema<string>>(API_URL + API_END_POINTS.convertDateToPeriodo);
    return response;
  }
}
