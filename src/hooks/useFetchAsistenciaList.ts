import { useQuery } from '@tanstack/react-query';

import { Grado, Seccion } from '../types/gradoSalon';
import { fetchAsistenciaList } from '../utils/asistencia';
import { useEffect } from 'react';
import ErrorHandler from '../utils/errorManagment';

export default function useFetchAsistenciaList({
  grado,
  seccion,
  month,
  day,
}: {
  day: number;
  grado: Grado | null | undefined;
  seccion: Seccion | null | undefined;
  month: string;
}) {
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['asistencia', grado, seccion],
    queryFn: () => fetchAsistenciaList({ grado, seccion, month, day }),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: grado !== null && seccion !== null,
  });

  useEffect(() => {
    if (!error) return;
    ErrorHandler(error);
  }, [error]);

  return { data, isFetching, error, refetch };
}
