import { useQuery } from '@tanstack/react-query';
import { Grado, Seccion } from '../types/gradoSalon';
import { fetchAsistenciaList } from '../utils/asistencia';
import { useEffect } from 'react';
import ErrorHandler from '../utils/errorManagment';
import { useSearchParams } from 'react-router-dom';

export default function useFetchAsistenciaList({
  month,
  day,
}: {
  day: number;

  month: string;
}) {
  const [searchParams] = useSearchParams();
  const grado = searchParams.get('grado') as Grado | undefined;
  const seccion = searchParams.get('seccion') as Seccion | undefined;

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['asistencia', grado, seccion],
    queryFn: () => fetchAsistenciaList({ grado, seccion, month, day }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: false,
  });

  useEffect(() => {
    if (!error) return;
    ErrorHandler(error);
  }, [error]);

  return { data, isFetching, error, refetch };
}
