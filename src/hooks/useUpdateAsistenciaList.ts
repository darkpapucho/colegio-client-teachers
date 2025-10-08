import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../config/reactQuery/reactQuery';
import { fetchAsistenciaList, updateAsistenciaList } from '../utils/asistencia';
import { useEffect } from 'react';
import ErrorHandler from '../utils/errorManagment';
import { AsistenciasReducerState } from '../Profesor/Asistencia/AsistenciasReducer';
import { useSearchParams } from 'react-router-dom';
import { Grado, Seccion } from '../types/gradoSalon';
import useCurrentPeriodo from './useCurrentPeriodo';

export default function useUpdateAsistenciaList({
  month,
  dayId,
  registroAsistencia,
  day,
}: {
  registroAsistencia: AsistenciasReducerState;
  month: string | undefined;
  dayId: string | undefined;

  day: number | undefined;
}) {
  const [searchParams] = useSearchParams();
  const grado = searchParams.get('grado') as Grado | undefined;
  const seccion = searchParams.get('seccion') as Seccion | undefined;
  const { currentPeriodo } = useCurrentPeriodo();
  const { mutate, isPending, error } = useMutation({
    mutationKey: ['asistencia', grado, seccion],
    mutationFn: () => updateAsistenciaList({ registroAsistencia, dayId, periodo: currentPeriodo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['asistencia', grado, seccion] });
      queryClient.prefetchQuery({ queryKey: ['asistencia', grado, seccion], queryFn: () => fetchAsistenciaList({ grado, seccion, month, day }) });
    },
  });
  useEffect(() => {
    if (!error) return;
    ErrorHandler(error);
  }, [error]);
  return { mutate, isPending, error };
}
