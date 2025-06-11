import axios from 'axios';
import setupAxiosInterceptorsTo, { AxiosResponseSchema } from '../../config/axios/axios';
import { API_END_POINTS } from '../../config/axios/endPoints';
import { API_URL } from '../../var/envData';
import { EstadoMatricula, Grado, Seccion } from '../../types/gradoSalon';
import { AMatriculado } from '../../types/alumno';

setupAxiosInterceptorsTo(axios);

export default class Pensiones {
  static async getLastUpdateDate() {
    const response = await axios.get<AxiosResponseSchema<string>>(API_URL + API_END_POINTS.GET_LAST_UPDATE_DATE);
    return response;
  }
  static async getRecordPensionesPagadasByDateRange({ initDate, endDate }: { initDate: string; endDate: string }) {
    const response = await axios.post<AxiosResponseSchema<{ alumno: { dni: string; nombreCompleto: string; grado: Grado; seccion: Seccion }; pensiones: Pension[] }[]>>(
      API_URL + API_END_POINTS.GET_RECORD_PENSIONES_BY_DATE_RANGE,
      { initDate, endDate }
    );
    return response;
  }
  static async editComentarioPension({ detalle, fecha, alumnoId }: { alumnoId: string; detalle: string; fecha: string }) {
    const response = await axios.post<AxiosResponseSchema<null>>(API_URL + API_END_POINTS.EDITAR_COMENTARIO_PENSION, { alumnoId, detalle, fecha });
    return response;
  }

  static async editarPensionPagada({ alumnoId, reciboId, montoPagado, fechaPago }: { alumnoId: string; reciboId: string; montoPagado: number; fechaPago: string }) {
    const response = await axios.post<AxiosResponseSchema<null>>(API_URL + API_END_POINTS.EDITAR_PENSION_PAGADA, { alumnoId, reciboId, montoPagado, fechaPago });
    return response;
  }
  static async getAlumnosListByNumPensionesAtrasadas({ numeroPensionesAtrasadas }: { numeroPensionesAtrasadas: number }) {
    const currentMonth = +new Date().toLocaleDateString('es-PE', { timeZone: 'America/Lima', month: '2-digit' }) - 1;

    const response = await axios.post<
      AxiosResponseSchema<{ comentario?: { fecha: string; detalle: string }; numeroPensionesAtrasadas: number; alumnoId: string; pensiones: Pension[]; estudiante: AMatriculado }[]>
    >(API_URL + API_END_POINTS.GET_ALUMNOS_BY_NUMERO_PENSIONES_ATRASADAS, { numeroPensionesAtrasadas, currentMonth });

    return response;
  }

  static async getPensionesGlobalReport() {
    const currentMonth = +new Date().toLocaleDateString('es-PE', { timeZone: 'America/Lima', month: '2-digit' }) - 1;
    const response = await axios.post<AxiosResponseSchema<{ numeroPensionesAtrasadas: number; totalAlumnos: number }[]>>(API_URL + API_END_POINTS.GET_PENSIONES_GLOBAL_REPORT, {
      currentMonth,
    });
    return response;
  }

  static async updateMontoPagarPensiones({ pensiones, alumnoId }: { alumnoId: string; pensiones: Pension[] }) {
    const response = await axios.post<AxiosResponseSchema<null>>(`${API_URL + API_END_POINTS.UPDATE_MONTO_PAGAR_PENSIONES}`, { pensiones, alumnoId });
    return response;
  }

  static async pagarPensionAlumnoIdMes({
    alumnoId,
    fecha,
    mes,
    monto_pagado,
    monto_pagar,
    monto_abonado,
  }: {
    alumnoId: string;
    fecha: string;
    mes: number;
    monto_pagado: number;
    monto_pagar: number;
    monto_abonado: number;
  }) {
    const response = await axios.post<AxiosResponseSchema<{ reciboId: string }>>(`${API_URL + API_END_POINTS.PAGAR_PENSION_ALUMNOID_MES}`, {
      alumnoId,
      fecha,
      mes,
      monto_pagado,
      monto_pagar,
      monto_abonado,
    });
    return response;
  }

  static async fetchListByGradoSeccion({ grado, seccion, estadosMatricula }: { estadosMatricula: EstadoMatricula[]; grado: Grado; seccion: Seccion }) {
    const response = await axios.post<AxiosResponseSchema<{ alumnoId: string; numPensionesPagadas: number; estudiante: AMatriculado; pensiones: Pension[] }[]>>(
      `${API_URL + API_END_POINTS.FETCH_PENSIONES_LIST_BY_GRADO_SECCION}`,
      { grado, seccion, estadosMatricula }
    );
    return response;
  }
}
