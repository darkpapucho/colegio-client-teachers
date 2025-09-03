import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../config/reactQuery/reactQuery';
import { Grado, Periodo, Seccion } from '../types/gradoSalon';
import { fetchAsistenciaList, updateAsistenciaList } from '../utils/asistencia';
import { useEffect } from 'react';
import ErrorHandler from '../utils/errorManagment';
import { AsistenciasReducerState } from '../Profesor/Asistencia/AsistenciasReducer';

export default function useUpdateAsistenciaList({
  grado,
  seccion,
  month,
  dayId,
  periodo,
  registroAsistencia,
  day,
}: {
  registroAsistencia: AsistenciasReducerState;
  month: string | undefined;
  dayId: string | undefined;
  grado: Grado | null;
  seccion: Seccion | null;
  periodo: Periodo | null;
  day: number | undefined;
}) {
  const { mutate, isPending, error } = useMutation({
    mutationKey: ['asistencia', grado, seccion],
    mutationFn: () => updateAsistenciaList({ registroAsistencia, dayId, periodo }),
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
