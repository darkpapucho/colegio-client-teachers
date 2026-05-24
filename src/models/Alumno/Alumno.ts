import axios from 'axios';
import setupAxiosInterceptorsTo, { AxiosResponseSchema } from '../../config/axios/axios';
import { API_URL } from '../../var/envData';
import { Grado, Seccion } from '../../types/gradoSalon';
import { AsistenciaList, AsistenciaValue, Month } from './types';
import { API_END_POINTS } from '../../config/axios/endPoints';
import { AMatriculado } from '../../types/alumno';
setupAxiosInterceptorsTo(axios);

export default class Alumno {
  static async fetchAsistenciaList({ grado, seccion, month, day }: { month: string; day: number; grado: Grado; seccion: Seccion }) {
    const API_END_POINT = API_END_POINTS.fetchAsistenciaList;

    const response = await axios.post<
      AxiosResponseSchema<{
        asistenciaList: { nombreCompleto: string; alumnoId: string; asistencia: AsistenciaValue }[];
        dayId: string;
        month: Month;
      }>
    >(API_URL + API_END_POINT, { grado, seccion, month, day });
    return response;
  }
  static async updateAsistenciaList({ asistenciaList }: { asistenciaList: AsistenciaList }) {
    const API_END_POINT = API_END_POINTS.updateAsistenciaList;
    const response = await axios.post<AxiosResponseSchema<null>>(API_URL + API_END_POINT, { asistenciaList });
    return response;
  }
  static async fetchByGradoSeccion({ grado, seccion }: { grado: Grado; seccion: Seccion }) {
    const response = await axios.get<AxiosResponseSchema<AMatriculado[]>>(API_URL + API_END_POINTS.FETCH_ALUMNOS_GRADO_SECCION + `?grado=${grado}&seccion=${seccion}`);
    return response;
  }
}
