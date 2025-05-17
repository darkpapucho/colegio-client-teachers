import { useQuery } from '@tanstack/react-query';
import { nivelState } from '../config/zustand/nivel';
import { yearState } from '../config/zustand/year';
import { fetchCurrentPeriodo } from '../utils/calendario';
import { useEffect } from 'react';
import ErrorHandler from '../utils/errorManagment';

export default function useCurrentPeriodo() {
  const nivel = nivelState.getState().nivel;
  const year = yearState.getState().year;
  const { data, isLoading, error } = useQuery({
    queryKey: ['current-periodo', nivel, year],
    queryFn: () => fetchCurrentPeriodo(),
    refetchOnWindowFocus: false,
  });
  useEffect(() => {
    if (!error) return;
    ErrorHandler(error);
  }, [error]);
  return { currentPeriodo: data, isLoading, error };
}
