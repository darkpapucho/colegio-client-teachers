import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import fetchListaAlumnos from '../Profesor/MisSalones/fetchSalones';
import { AMatriculado } from '../types/alumno';
import ErrorHandler from '../utils/errorManagment';
import useGradoSeccionSearchParams from './useGradoSeccionSearchParams';
import { nivelState } from '../config/zustand/nivel';
import { Nivel } from '../types/gradoSalon';

export default function useListaAlumnos() {
  const { grado, seccion } = useGradoSeccionSearchParams();
  const nivel = nivelState((state) => state.nivel) as Nivel;
  const { isFetching, data, error, refetch } = useQuery({
    queryKey: ['lista-alumnos', nivel, grado, seccion],
    queryFn: fetchListaAlumnos.bind(null, { grado, seccion }),
    enabled: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const [selectedAlumno, setSelectedAlumno] = useState<AMatriculado | null>(null);
  useEffect(() => {
    if (error) {
      ErrorHandler(error);
    }
  }, [error]);

  return { isFetching, alumnos: data, selectedAlumno, setSelectedAlumno, refetch };
}
