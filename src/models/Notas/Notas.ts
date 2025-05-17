import axios from 'axios';
import { Grado, Seccion } from '../../types/gradoSalon';
import { API_URL } from '../../var/envData';
import { API_END_POINTS } from '../../config/axios/endPoints';
import setupAxiosInterceptorsTo, { AxiosResponseSchema } from '../../config/axios/axios';
import { CURSO_SALON, RecordNotas } from '../../types/notas';
setupAxiosInterceptorsTo(axios);

export default class Notas {
  static async fetchRegistroPrimaria({ grado, seccion, isTutor, cursosProfesor }: { isTutor: boolean; cursosProfesor: CURSO_SALON[]; grado: Grado; seccion: Seccion }) {
    const response = axios.post<AxiosResponseSchema<RecordNotas[]>>(API_URL + API_END_POINTS.GET_NOTAS_PRIMARIA_BY_GRADO_SECCION, {
      grado,
      seccion,
      isTutor,
      cursosProfesor,
    });

    return response;
  }
  static async updateRecordNotasPrimaria({ registro, isTutor, cursosProfesor }: { isTutor: boolean; cursosProfesor: CURSO_SALON[]; registro: RecordNotas[] }) {
    const response = await axios.post<AxiosResponseSchema<null>>(API_URL + API_END_POINTS.UPDATE_RECORD_NOTAS_PRIMARIA, { registro, isTutor, cursosProfesor });
    return response;
  }
}
