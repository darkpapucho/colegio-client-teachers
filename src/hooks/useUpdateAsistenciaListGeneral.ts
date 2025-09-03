import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { queryClient } from '../config/reactQuery/reactQuery';
import Calendario from '../models/Calendario/Calendario';
import { AsistenciasReducerState } from '../Profesor/Asistencia/AsistenciasReducer';
import { AsistenciaValue } from '../Profesor/AsistenciaRecords/types';
import { MONTHS } from '../Profesor/Pensiones/PorSalon/components/utils';
import { Year } from '../types/gradoSalon';
import { updateToken } from '../utils/axiosUtils';

import { yearState } from '../config/zustand/year';
import ErrorHandler from '../utils/errorManagment';
import toaster from 'react-hot-toast';

export type AsistenciaListGeneral = {
  dayId: string;
  day: number;
  month: string;
  list: { alumnoId: string; asistencia: AsistenciaValue }[];
};

export default function useUpdateAsistenciaListGeneral({
  searchParams,
  month,
  dayId,
  registroAsistencia,
  day,
}: {
  searchParams: URLSearchParams;
  registroAsistencia: AsistenciasReducerState;
  month: string | undefined;
  dayId: string | undefined;
  day: number | undefined;
}) {
  const grado = searchParams.get('grado');
  const seccion = searchParams.get('seccion');
  const year = yearState((state) => state.year);

  const { mutate, error, isPending } = useMutation({
    mutationKey: ['update-asistencia-general', grado, seccion, dayId],
    mutationFn: () => updateAsistenciaListHelper({ registroAsistencia, dayId, day, month, year }),
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ['asistencia-general', grado, seccion, month, dayId] });
      queryClient.setQueryData(['asistencia-general', grado, seccion, month, dayId], () => ({ asistenciaList: registroAsistencia, month, dayId }));
      // queryClient.prefetchQuery({
      //   queryKey: ['asistencia-general', grado, seccion, month, dayId],
      //   queryFn: () => fetchAsistenciaListByGradoSeccionDayId({ grado, seccion, month, dayId, estadosMatricula }),
      // });
    },
  });
  useEffect(() => {
    if (!error) return;
    ErrorHandler(error);
  }, [error]);
  return { mutate, isPending };
}

export async function updateAsistenciaListHelper({
  registroAsistencia,
  dayId,
  day,
  month,
  year,
}: {
  year: Year;
  dayId: string | undefined;
  day: number | undefined;
  month: string | undefined;
  registroAsistencia: AsistenciasReducerState;
}) {
  if (!month || !dayId || !day) throw new Error('invalid request params');
  const asistenciaList: AsistenciaListGeneral = {
    dayId,
    day,
    month,
    //eliminar nombreCompleto de los records
    list: registroAsistencia.map((record) => ({ alumnoId: record.alumnoId, asistencia: record.asistencia })),
  };
  const totalFaltas: number = asistenciaList.list.filter((record) => record.asistencia === 'F').length;
  const totalTardanzas: number = asistenciaList.list.filter((record) => record.asistencia === 'T').length;
  if (
    !window.confirm(
      `Estas seguro que deseas alterar la asistencia del ${new Date(`${year}-${MONTHS.findIndex((element) => element === month) + 1}-${day}`).toLocaleDateString('es-PE', {
        timeZone: 'America/Lima',
        day: '2-digit',
        month: 'long',
      })}
      Faltas: ${totalFaltas}
      Tardanzas: ${totalTardanzas}
      `
    )
  )
    return;
  const response = await Calendario.updateAsistenciaGeneral({ asistenciaList: asistenciaList });
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  toaster.success('Se guardó la lista de asistencia');
}
