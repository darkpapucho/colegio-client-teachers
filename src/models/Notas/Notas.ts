import axios from 'axios';
import { Grado, Nivel, Seccion } from '../../types/gradoSalon';
import { API_URL } from '../../var/envData';
import { API_END_POINTS } from '../../config/axios/endPoints';
import setupAxiosInterceptorsTo, { AxiosResponseSchema } from '../../config/axios/axios';
import { CURSO_SALON, RecordNotas } from '../../types/notas';
setupAxiosInterceptorsTo(axios);

export default class Notas {
  static async generateLibretaNotas({ grado, seccion, nivel }: { grado: Grado; seccion: Seccion; nivel: Nivel }) {
    if (nivel === 'primaria' || nivel === 'secundaria') {
      const response = await axios.post(
        API_URL + API_END_POINTS.GENERAR_LIBRETAS_PRIMARIA,
        { grado, seccion, nivel, zipped: true, excluirAtrasados: true, estadosMatricula: ['DEFINITIVA', 'EN PROCESO'] },
        { responseType: 'arraybuffer' },
      );
      return response;
    } else if (nivel === 'inicial') {
      //inicial
      const response = await axios.post(
        API_URL + API_END_POINTS.GENERAR_LIBRETAS_INICIAL,
        { grado, seccion, nivel, zipped: true, excluirAtrasados: true, estadosMatricula: ['DEFINITIVA', 'EN PROCESO'] },
        { responseType: 'arraybuffer' },
      );
      return response;
    } else {
      throw new Error('nivel inválido');
    }
  }
  static async fetchRegistroPrimaria({
    grado,
    seccion,
    isTutor,
    cursosProfesor,
  }: {
    isTutor: boolean;
    cursosProfesor: CURSO_SALON[];
    grado: Grado;
    seccion: Seccion;
  }) {
    const response = await axios.post<AxiosResponseSchema<RecordNotas[]>>(
      API_URL + API_END_POINTS.GET_NOTAS_PRIMARIA_BY_GRADO_SECCION,
      {
        grado,
        seccion,
        isTutor,
        cursosProfesor,
      },
    );

    return response;
  }
  static async updateRecordNotasPrimaria({
    registro,
    isTutor,
    cursosProfesor,
  }: {
    isTutor: boolean;
    cursosProfesor: CURSO_SALON[];
    registro: RecordNotas[];
  }) {
    const response = await axios.post<AxiosResponseSchema<null>>(
      API_URL + API_END_POINTS.UPDATE_RECORD_NOTAS_PRIMARIA,
      { registro, isTutor, cursosProfesor },
    );
    return response;
  }
}
