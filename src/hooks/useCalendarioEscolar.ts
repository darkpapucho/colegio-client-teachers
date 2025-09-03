import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import Calendario from '../models/Calendario/Calendario';
import { updateToken } from '../utils/axiosUtils';
import { nivelState } from '../config/zustand/nivel';
import { yearState } from '../config/zustand/year';
import { CalendarioList } from '../types/calendar';
import ErrorHandler from '../utils/errorManagment';

export default function useCalendarioEscolar() {
  const nivel = nivelState((state) => state.nivel);
  const year = yearState((state) => state.year);
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ['calendario-escolar', nivel, year],
    queryFn: () => fetchCalendario(),
    enabled: true,
    refetchOnWindowFocus: false,
  });

  const [months, setMonths] = useState<{ [key: string]: Omit<CalendarioList, 'month'>[] }>({
    marzo: [],
    abril: [],
    mayo: [],
    junio: [],
    julio: [],
    agosto: [],
    septiembre: [],
    octubre: [],
    noviembre: [],
    diciembre: [],
  });
  useEffect(() => {
    if (!error) return;
    ErrorHandler(error);
  }, [error]);

  useEffect(() => {
    if (!data) return;
    const dataByMonths = groupDataByMonths(data);
    setMonths(dataByMonths);
  }, [data]);

  return { months, isLoading, isFetching, error, refetch };
}

export async function fetchCalendario() {
  const response = await Calendario.fetchCalendario();
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload;
}

function groupDataByMonths(data: CalendarioList[]) {
  const blueprint: { [key: string]: Omit<CalendarioList, 'month'>[] } = {
    marzo: [],
    abril: [],
    mayo: [],
    junio: [],
    julio: [],
    agosto: [],
    septiembre: [],
    octubre: [],
    noviembre: [],
    diciembre: [],
  };
  data.forEach((record) => {
    blueprint[record.month].push({ day: record.day, _id: record._id, createdAt: record.createdAt, status: record.status });
  });
  for (const month in blueprint) {
    blueprint[month].sort((old, current) => {
      return current.day < old.day ? 1 : -1;
    });
  }
  return blueprint;
}
