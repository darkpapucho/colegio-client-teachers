import axios from 'axios';
import setupAxiosInterceptorsTo, { AxiosResponseSchema } from '../../config/axios/axios';
import { API_END_POINTS } from '../../config/axios/endPoints';
import { API_URL } from '../../var/envData';
import { RegistroNotasInicialProfesor } from './types';
import { HorarioCell } from '../../types/horario';
import { SalonProfesor } from '../../config/zustand/types/teacher';

setupAxiosInterceptorsTo(axios);

export class Profesor {
  static async deleteAnuncio({ anuncioId, profesorId }: { profesorId: string; anuncioId: string }) {
    const response = await axios.post<AxiosResponseSchema<null>>(API_URL + API_END_POINTS.DELETE_ANUNCIO_PROFESOR, {
      anuncioId,
      profesorId,
    });
    return response;
  }
  static async agregarAnuncio({
    content,
    title,
    date,
    profesorId,
    salones,
  }: {
    salones: string[];
    profesorId: string;
    title: string;
    content: string;
    date: string;
  }) {
    const response = await axios.post<AxiosResponseSchema<string>>(API_URL + API_END_POINTS.AGREGAR_ANUNCIO_PROFESOR, {
      title,
      content,
      date,
      profesorId,
      salones,
    });
    return response;
  }
  static async eliminarHorarioCell({
    startTime,
    endTime,
    profesorId,
    curso,
    salon,
  }: {
    startTime: Date;
    endTime: Date;
    profesorId: string;
    curso: string;
    salon: string;
  }) {
    const response = await axios.post<AxiosResponseSchema<boolean>>(API_URL + API_END_POINTS.ELIMINAR_HORARIO_CELL, {
      startTime,
      endTime,
      profesorId,
      curso,
      salon,
    });
    return response;
  }
  static async agregarHorarioCell({
    startTime,
    endTime,
    profesorId,
    curso,
    salon,
  }: {
    startTime: Date;
    endTime: Date;
    profesorId: string;
    curso: string;
    salon: string;
  }) {
    const response = await axios.post<AxiosResponseSchema<HorarioCell[]>>(
      API_URL + API_END_POINTS.AGREGAR_HORARIO_CELL,
      { startTime, endTime, profesorId, curso, salon },
    );
    return response;
  }
  static async changeProfesorPassword({
    newPassword,
    userId,
    currentPassword,
  }: {
    currentPassword: string;
    newPassword: string;
    userId: string;
  }) {
    const response = await axios.post<AxiosResponseSchema<null>>(API_URL + API_END_POINTS.changeProfesorPassword, {
      newPassword,
      userId,
      currentPassword,
    });
    return response;
  }
  static async fetchRegistroBySalon({ salon }: { salon: SalonProfesor }) {
    const API_END_POINT = API_END_POINTS.profesorGetRegistroNotasBySalon;
    const response = await axios.post<AxiosResponseSchema<RegistroNotasInicialProfesor[]>>(API_URL + API_END_POINT, {
      salon,
    });
    return response;
  }
  static async updateRegistroProfesor({
    registro,
    isTutor,
  }: {
    registro: RegistroNotasInicialProfesor[];
    isTutor: boolean;
  }) {
    const API_END_POINT = API_END_POINTS.updateRegistroProfesor;
    const response = await axios.post<AxiosResponseSchema<null>>(API_URL + API_END_POINT, { registro, isTutor });
    return response;
  }
}
