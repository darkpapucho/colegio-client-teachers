import axios from 'axios';
import setupAxiosInterceptorsTo, { AxiosResponseSchema } from '../../config/axios/axios';
import { API_URL } from '../../var/envData';
import { Grado, Seccion } from '../../types/gradoSalon';
import { AsistenciaList, AsistenciaValue, Month } from './types';
import { API_END_POINTS } from '../../config/axios/endPoints';
import { AMatriculado, Apoderado, NuevoApoderado } from '../../types/alumno';
setupAxiosInterceptorsTo(axios);

type TipoIncidencia = 'Indiciplina' | 'Agresión Física' | 'Agresión Verbal' | 'Hurto' | 'Daño a bienes materiales';

export type RecordIncidencias = {
  alumnoId: string;
  fecha: string;
  incidencia: TipoIncidencia;
  detalles: string;
  reportante: {
    nombreCompleto: string;
    userId: string;
  };
};

export type AlumnoInfo = {
  _id: string;
  nombres: string;
  apellidos: string;
  dni?: string;
  codigoEstudiante?: string;
  grado: Grado;
  seccion: Seccion;
  pensiones: Pension[];
  incidencias: RecordIncidencias;
};

export default class Alumno {
  static async fetchAlumnoInfo({ alumnoId }: { alumnoId: string }) {
    const response = await axios.get<AxiosResponseSchema<null>>(API_URL + API_END_POINTS.FETCH_ALUMNO_INFO);

    console.log({ alumnoId });
    return response;
  }
  static async agregarApoderado({ alumnoId, nuevoApoderado }: { alumnoId: string; nuevoApoderado: NuevoApoderado }) {
    const response = await axios.post<AxiosResponseSchema<boolean>>(API_URL + API_END_POINTS.AGREGAR_APODERADO, {
      alumnoId,
      apoderado: nuevoApoderado,
    });
    return response;
  }
  static async editarApoderado({ alumnoId, apoderado }: { alumnoId: string; apoderado: Apoderado }) {
    const response = await axios.post<AxiosResponseSchema<boolean>>(API_URL + API_END_POINTS.EDITAR_APODERADO, {
      alumnoId,
      apoderado,
    });
    return response;
  }
  static async fetchAsistenciaList({
    grado,
    seccion,
    month,
    day,
  }: {
    month: string;
    day: number;
    grado: Grado;
    seccion: Seccion;
  }) {
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
    const response = await axios.get<AxiosResponseSchema<AMatriculado[]>>(
      API_URL + API_END_POINTS.FETCH_ALUMNOS_GRADO_SECCION + `?grado=${grado}&seccion=${seccion}`,
    );
    return response;
  }
}
