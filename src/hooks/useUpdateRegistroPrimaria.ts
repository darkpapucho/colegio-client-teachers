// import { useMutation } from '@tanstack/react-query';
// import { CURSO_SALON, RecordNotas } from '../types/notas';
// import Notas from '../models/Notas/Notas';
// import { updateToken } from '../utils/axiosUtils';

// import { nivelState } from '../config/zustand/nivel';
// import { Grado, Nivel, Seccion, Year } from '../types/gradoSalon';
// import { yearState } from '../config/zustand/year';
// import { useEffect } from 'react';
// import toaster from 'react-hot-toast';
// import ErrorHandler from '../utils/errorManagment';
// import { queryClient } from '../config/reactQuery/reactQuery';
// // import { fetchRegistroPrimaria } from './useRegistroPrimaria';
// import { Profesor, useProfesor } from './useProfesor';

// export default function useUpdateRegistroPrimaria({
//   registro,
//   cursosProfesor,
//   grado,
//   seccion,
// }: {
//   registro: RecordNotas[];
//   cursosProfesor: CURSO_SALON[];
//   grado: Grado | null;
//   seccion: Seccion | null;
// }) {
//   const nivel = nivelState((state) => state.nivel) as Nivel;
//   const year = yearState((state) => state.year) as Year;
//   const profesor = useProfesor((state) => state.profesor) as Profesor;
//   const isTutor = profesor.salones.find((salon) => salon.label === `${grado} ${seccion}`)?.tutor ?? false;
//   const { mutate, isPending, error } = useMutation<RecordNotas[], Error, { registro: RecordNotas[]; isTutor: boolean; cursosProfesor: CURSO_SALON[] }>({
//     mutationKey: ['update-registro-primaria', nivel, year, grado, seccion],
//     mutationFn: updateRegistroPrimariaHandler,
//     onSuccess: () => {
//       toaster.success('registro actualizado exitosamente');
//       queryClient.invalidateQueries({ queryKey: ['registro-primaria', nivel, year, grado, seccion] });
//       queryClient.prefetchQuery({ queryKey: ['registro-primaria', nivel, year, grado, seccion], queryFn: () => fetchRegistroPrimaria(grado, seccion, cursosProfesor, isTutor) });
//     },
//   });

//   useEffect(() => {
//     if (!error) return;
//     ErrorHandler(error);
//   }, [error]);
//   return { mutate: mutate.bind(null, { registro, isTutor, cursosProfesor }), isPending };
// }

// async function updateRegistroPrimariaHandler({ registro, isTutor, cursosProfesor }: { registro: RecordNotas[]; isTutor: boolean; cursosProfesor: CURSO_SALON[] }) {
//   if (!registro || !cursosProfesor) throw new Error('falta el registro o la lista de cursos del profesor');
//   const response = await Notas.updateRecordNotasPrimaria({ registro, isTutor, cursosProfesor });
//   updateToken(response);
//   if (!response.data.ok) throw new Error(response.data.message);
//   return registro;
// }
