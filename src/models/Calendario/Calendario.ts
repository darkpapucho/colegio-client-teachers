import axios from 'axios';
import setupAxiosInterceptorsTo, { AxiosResponseSchema } from '../../config/axios/axios';
import { API_URL } from '../../var/envData';
import { API_END_POINTS } from '../../config/axios/endPoints';
import { EstadoMatricula, Grado, Periodo, Seccion } from '../../types/gradoSalon';
import { AsistenciaRecord } from '../../Profesor/AsistenciaRecords/types';
import { MONTH_NAME } from '../../Profesor/AsistenciaRecords/utils';
import { CalendarioList } from '../../types/calendar';
import { AsistenciaValue } from '../Alumno/types';
import { AsistenciaListGeneral } from '../../hooks/useUpdateAsistenciaListGeneral';

setupAxiosInterceptorsTo(axios);

export default class Calendario {
  static async updateAsistenciaGeneral({ asistenciaList }: { asistenciaList: AsistenciaListGeneral }) {
    const API_END_POINT = API_END_POINTS.UPDATE_ASISTENCIA_LIST_BY_GRADO_SECCION_DAY_ID;
    const response = await axios.post<AxiosResponseSchema<null>>(API_URL + API_END_POINT, { asistenciaList });
    return response;
  }
  static async fetchAsistenciaListByGradoSeccionDayId({
    grado,
    seccion,
    month,
    dayId,
    estadosMatricula,
  }: {
    grado: string | null;
    seccion: string | null;
    month: string | undefined;
    dayId: string | undefined;
    estadosMatricula: string[] | undefined;
  }) {
    if (!grado || !seccion || !month || !dayId || !estadosMatricula) throw new Error('invalid request');
    const response = await axios.post<
      AxiosResponseSchema<{
        asistenciaList: { nombreCompleto: string; asistencia: AsistenciaValue; alumnoId: string }[];
        dayId: string;
        month: MONTH_NAME;
      }>
    >(API_URL + API_END_POINTS.FETCH_ASISTENCIA_LIST_BY_GRADO_SECCION_DAY_ID, { grado, seccion, month, dayId, estadosMatricula });
    return response;
  }
  static async fetchCalendario() {
    const response = await axios.get<AxiosResponseSchema<CalendarioList[]>>(API_URL + API_END_POINTS.fetchCalendario);
    return response;
  }
  static async getRecordAsistenciaAlumnos({ periodo, grado, seccion }: { periodo: Periodo; grado: Grado; seccion: Seccion }) {
    const response = await axios.post<
      AxiosResponseSchema<{
        asistencias: { nombreCompleto: string; alumnoId: string; records: AsistenciaRecord[] }[];
        availableDays: { month: MONTH_NAME; day: number }[];
      }>
    >(API_URL + API_END_POINTS.getRecordAsistenciaAlumnos, { grado, seccion, periodo, estadosMatricula: ['DEFINITIVA', 'EN PROCESO'] });

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
  static async downloadPDFAsistenciaList({
    grado,
    seccion,
    periodo,
    withData,
    estadosMatricula,
  }: {
    estadosMatricula: EstadoMatricula[];
    withData: boolean;
    grado: Grado;
    seccion: Seccion;
    periodo: Periodo;
  }) {
    const response = await axios.post(API_URL + API_END_POINTS.getPDFAsistenciaList, { grado, seccion, periodo, withData, estadosMatricula }, { responseType: 'arraybuffer' });
    return response;
  }
}
