// import { useQuery } from '@tanstack/react-query';
// import { nivelState } from '../config/zustand/nivel';
// import { Grado, Nivel, Seccion, Year } from '../types/gradoSalon';
// import { yearState } from '../config/zustand/year';
// import Notas from '../models/Notas/Notas';
// import { updateToken } from '../utils/axiosUtils';
// import { useEffect, useRef } from 'react';
// import ErrorHandler from '../utils/errorManagment';
// import { CURSO_SALON, RecordNotas } from '../types/notas';
// import { useImmerReducer } from 'use-immer';
// import RegistroPrimariaReducer, { RegistroPrimariaActions } from '../Profesor/Registro/RegistroTable/Primaria/RegistroPrimariaReducer';
// import { useProfesor } from './useProfesor';
// import { queryClient } from '../config/reactQuery/reactQuery';

// export default function useRegistroPrimaria({recordNotas, grado, seccion }: {   grado : Grado | null; seccion: Seccion | null , recordNotas:RecordNotas[] | undefined}) {

//   // const { data, error, isFetching, refetch } = useQuery({
//   //   refetchOnWindowFocus: false,
//   //   refetchOnMount: false,
//   //   enabled: false,
//   //   queryKey,
//   //   queryFn: () => fetchRegistroPrimaria(grado, seccion, cursosProfesor!, isTutor),
//   // });
//   useEffect(() => {
//     if (previousParams.current.grado !== grado || previousParams.current.seccion !== seccion) {
//       //limpiar el registro visual
//       dispatch({ type: 'set-register', payload: [] });
//       queryClient.removeQueries({ queryKey });
//       previousParams.current = { grado, seccion };
//     }
//   }, [grado, seccion]);
//   useEffect(() => {
//     if (!error) return;
//     ErrorHandler(error);
//   }, [error]);
//   useEffect(() => {
//     if (!data) return;
//     dispatch({ type: 'set-register', payload: [...data] });
//     // setCursosProfesor(profesor.salones.find((salon) => salon.label === `${grado} ${seccion}`)!.cursos);
//   }, [data]);

//   return { cursosProfesor, isTutor, registro :mutableRegistro, dispatch};
// }

// export async function fetchRegistroPrimaria(grado: Grado | null, seccion: Seccion | null, cursosProfesor: CURSO_SALON[], isTutor: boolean) {
//   if (!grado || !seccion) throw new Error('grado y seccion son obligatorios');
//   const response = await Notas.fetchRegistroPrimaria({ grado, seccion, cursosProfesor, isTutor });
//   updateToken(response);
//   if (!response.data.ok) throw new Error(response.data.message);
//   return response.data.payload;
// }
