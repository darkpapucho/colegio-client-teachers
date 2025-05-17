import { useQuery } from '@tanstack/react-query';
import { nivelState } from '../config/zustand/nivel';
import { Grado, Nivel, Seccion, Year } from '../types/gradoSalon';
import { yearState } from '../config/zustand/year';
import Notas from '../models/Notas/Notas';
import { updateToken } from '../utils/axiosUtils';
import useGradoSeccionSearchParams from './useGradoSeccionSearchParams';
import { useEffect } from 'react';
import ErrorHandler from '../utils/errorManagment';
import { CURSO_SALON, RecordNotas } from '../types/notas';
import { useImmerReducer } from 'use-immer';
import RegistroPrimariaReducer, { RegistroPrimariaActions } from '../Profesor/Registro/RegistroTable/Primaria/RegistroPrimariaReducer';
import { useProfesor } from './useProfesor';

export default function useRegistroPrimaria() {
  const nivel = nivelState((state) => state.nivel) as Nivel;
  const year = yearState((state) => state.year) as Year;
  const { grado, seccion } = useGradoSeccionSearchParams();
  const profesor = useProfesor((state) => state.profesor)!;
  const [mutableRegistro, dispatch] = useImmerReducer<RecordNotas[], RegistroPrimariaActions>(RegistroPrimariaReducer, []);
  const cursosProfesor = profesor.salones.find((salon) => salon.label === `${grado} ${seccion}`)?.cursos ?? [];

  const { data, error, isFetching, refetch } = useQuery({
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: grado != null && seccion != null,
    queryKey: ['registro-primaria', nivel, year, grado, seccion],
    queryFn: () => fetchRegistroPrimaria(grado, seccion, cursosProfesor!, profesor.salones.find((salon) => salon.label === `${grado} ${seccion}`)?.tutor ?? false),
  });

  useEffect(() => {
    if (!error) return;
    ErrorHandler(error);
  }, [error]);
  useEffect(() => {
    if (!data) return;
    dispatch({ type: 'set-register', payload: [...data] });
    // setCursosProfesor(profesor.salones.find((salon) => salon.label === `${grado} ${seccion}`)!.cursos);
  }, [data]);

  return { registro: mutableRegistro, dispatch, isFetching, refetch, cursosProfesor };
}

export async function fetchRegistroPrimaria(grado: Grado | null, seccion: Seccion | null, cursosProfesor: CURSO_SALON[], isTutor: boolean) {
  if (!grado || !seccion) throw new Error('grado y seccion son obligatorios');
  const response = await Notas.fetchRegistroPrimaria({ grado, seccion, cursosProfesor, isTutor });
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message);
  return response.data.payload;
}
