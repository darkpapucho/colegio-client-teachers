import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Calendario from '../models/Calendario/Calendario';
import { MONTH_NAME } from '../Profesor/AsistenciaRecords/utils';
import { updateToken } from '../utils/axiosUtils';
import ErrorHandler from '../utils/errorManagment';

export default function useFetchAsistenciaListByDayId({ month, dayId, searchParams }: { searchParams: URLSearchParams; month: MONTH_NAME | undefined; dayId: string | undefined }) {
  const grado = searchParams.get('grado');
  const seccion = searchParams.get('seccion');
  console.log({ month, dayId, grado, seccion });
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['asistencia-general', searchParams.get('grado'), searchParams.get('seccion'), month, dayId],
    queryFn: () =>
      fetchAsistenciaListByGradoSeccionDayId({
        grado,
        seccion,
        dayId,
        month,
        estadosMatricula: ['DEFINITIVA', 'EN PROCESO'],
      }),
    enabled: grado != null && seccion != null && month != undefined && dayId != undefined,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });
  useEffect(() => {
    if (!error) return;
    ErrorHandler(error);
  }, [error]);
  return { data, isLoading, refetch };
}

export async function fetchAsistenciaListByGradoSeccionDayId({
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
  try {
    if (!grado || !seccion || !month || !dayId || !estadosMatricula || estadosMatricula.length == 0) throw new Error('invalid request data');

    const response = await Calendario.fetchAsistenciaListByGradoSeccionDayId({ grado, seccion, month, dayId, estadosMatricula });
    console.log({ response });
    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    return response.data.payload;
  } catch (err) {
    ErrorHandler(err);
  }
}
