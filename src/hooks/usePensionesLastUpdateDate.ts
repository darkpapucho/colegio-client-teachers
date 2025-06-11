import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Pensiones from '../models/Pensiones/Pension';
import { Nivel, Year } from '../types/gradoSalon';
import { updateToken } from '../utils/axiosUtils';
import { nivelState } from '../config/zustand/nivel';
import { yearState } from '../config/zustand/year';
import ErrorHandler from '../utils/errorManagment';

export default function usePensionesLastUpdateDate() {
  const nivel = nivelState((state) => state.nivel) as Nivel;
  const year = yearState((state) => state.year) as Year;
  const { data, isFetching, error } = useQuery({
    queryFn: fetchLastUpdateDate,
    queryKey: ['last-update-date', nivel, year],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });
  useEffect(() => {
    if (!error) return;
    ErrorHandler(error);
  }, [error]);
  return { date: data, isFetching };
}

export async function fetchLastUpdateDate() {
  const response = await Pensiones.getLastUpdateDate();
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload;
}
