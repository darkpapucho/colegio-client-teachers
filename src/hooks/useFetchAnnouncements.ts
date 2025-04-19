import { useQuery } from '@tanstack/react-query';
import { nivelState } from '../config/zustand/nivel';
import { yearState } from '../config/zustand/year';
import { useProfesor } from './useProfesor';
import Announcements from '../models/Announcements/Announcements';
import { updateToken } from '../utils/axiosUtils';
import { useEffect } from 'react';
import ErrorHandler from '../utils/errorManagment';

export default function useFetchAnnouncements() {
  const nivel = nivelState((state) => state.nivel);
  const year = yearState((state) => state.year);
  const profesorId = useProfesor((state) => state.profesor?._id)!;
  const { data, isFetching, error } = useQuery({ queryKey: ['announcements', nivel, year, profesorId], queryFn: fetchAnnouncements });
  useEffect(() => {
    if (!error) return;
    ErrorHandler(error);
  }, [error]);
  return { data, isFetching };
}

async function fetchAnnouncements() {
  const response = await Announcements.fetchAnnouncements();
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload;
}
