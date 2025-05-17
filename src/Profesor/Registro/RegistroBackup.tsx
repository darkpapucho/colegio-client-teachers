// import { useMutation, useQuery } from '@tanstack/react-query';
// import { Container } from '../../components/Shared/Container/Container';
// import Select from '../../components/Shared/Select/Select';
// import { theme } from '../../config/styled/styled';
// import useGradoSeccionSearchParams from '../../hooks/useGradoSeccionSearchParams';
// import { useProfesor } from '../../hooks/useProfesor';
// import { Grado, Periodo, Seccion } from '../../types/gradoSalon';
// import { Profesor } from '../../models/Profesor/Profesor';
// import RegistroTable from './RegistroTable/Inicial/RegistroTableInicial';
// import { useImmerReducer } from 'use-immer';
// import RegistroReducer, { RegistroInicialReducerAction, RegistroInicialReducerState } from './RegistroTable/Inicial/registroInicialReducer';
// import React, { createContext, Dispatch, useEffect, useState } from 'react';
// import EditConClusionesDescriptivasModal from './RegistroTable/EditConclusionesDescriptivasModal';
// import ErrorHandler from '../../utils/errorManagment';
// import ConclusionesDescriptivasModalForm from './RegistroTable/ConclusionesDescriptivasModalForm';
// import { Button } from '../../components/Shared/Button/Button';
// import { RegistroNotasProfesor } from '../../models/Profesor/types';
// import { queryClient } from '../../config/reactQuery/reactQuery';
// import Loader from '../../components/Shared/Loader/Loader';
// import toaster from 'react-hot-toast';
// import { generateGrados, generateSecciones } from '../../utils/profesor';
// import { updateToken } from '../../utils/axiosUtils';
// import useCurrentPeriodo from '../../hooks/useCurrentPeriodo';
// import { Text } from '../../components/Shared/Text/Text';
// import { convertPeriodoKeyToLabel } from '../../utils/periodo';

// export const RegistroContext = createContext<{
//   dispatch: (action: RegistroInicialReducerAction) => void;
//   setConclusionesDescriptivasModalData: Dispatch<
//     React.SetStateAction<{
//       alumnoId: string;
//       periodo: Periodo;
//       data: string;
//       apellidos: string;
//       nombres: string;
//     } | null>
//   >;
//   periodo: Periodo;
//   setShowModal: Dispatch<React.SetStateAction<boolean>>;
//   conclusionesDescriptivasModalData: {
//     alumnoId: string;
//     periodo: Periodo;
//     data: string;
//     apellidos: string;
//     nombres: string;
//   } | null;
// } | null>(null);

// export default function Registro() {
//   const { data: currentPeriodo, isLoading } = useCurrentPeriodo();
//   const periodo = currentPeriodo || 'primerPeriodo';
//   const profesor = useProfesor((state) => state.profesor);
//   const salones = profesor!.salones;
//   const { grado, seccion } = useGradoSeccionSearchParams();
//   //isTutor?
//   const isTutor = salones.find((salon) => salon.value.grado === grado && salon.value.seccion === seccion)?.tutor;
//   //useQuery
//   const { isFetching, error, data } = useQuery({
//     queryKey: ['registro-profesor', grado, seccion],
//     queryFn: () => fetchRegistro({ grado, seccion }),
//     refetchOnWindowFocus: false,
//     enabled: grado != null && seccion != null,
//   });

//   const {
//     mutate,
//     isPending,
//     error: mutateError,
//   } = useMutation({
//     mutationKey: ['updated-registro-profesor'],
//     mutationFn: () => updateRegistroProfesor(registro as unknown as RegistroNotasProfesor, isTutor as boolean),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['registro-profesor', grado, seccion] });
//       queryClient.prefetchQuery({ queryKey: ['registro-profesor', grado, seccion], queryFn: () => fetchRegistro({ grado, seccion }) });
//     },
//   });
//   const [registro, dispatchRegistro] = useImmerReducer<RegistroInicialReducerState, RegistroInicialReducerAction>(RegistroReducer, []);
//   const [showModal, setShowModal] = useState(false);

//   const [conclusionesDescriptivasModalData, setConclusionesDescriptivasModalData] = useState<{
//     alumnoId: string;
//     periodo: Periodo;
//     data: string;
//     nombres: string;
//     apellidos: string;
//   } | null>(null);

//   useEffect(() => {
//     if (!data) return;
//     dispatchRegistro({
//       type: 'setRegistro',
//       payload: [...data],
//     });
//   }, [data]);

//   useEffect(() => {
//     if (error) {
//       ErrorHandler(error);
//     } else if (mutateError) {
//       ErrorHandler(mutateError);
//     }
//   }, [error, mutateError]);

//   if (!currentPeriodo) {
//     return <>No existe un periodo activo dentro del calendario escolar.</>;
//   }
//   return (
//     <>
//       {(isFetching || isPending || isLoading) && <Loader />}
//       <RegistroContext.Provider
//         value={{
//           dispatch: dispatchRegistro,
//           setConclusionesDescriptivasModalData,
//           periodo: periodo as Periodo,
//           setShowModal,
//           conclusionesDescriptivasModalData,
//         }}>
//         {showModal && isTutor && (
//           <EditConClusionesDescriptivasModal onCloseModal={() => setShowModal(false)} data={conclusionesDescriptivasModalData}>
//             <ConclusionesDescriptivasModalForm />
//           </EditConClusionesDescriptivasModal>
//         )}
//         <Container $direction="column" $width="100%" $gap="2rem" $padding="0 0 3rem 0">
//           <Container $direction="row" $width="100%" $bgColor={theme.colors.tertiary.light} $padding="1rem" $gap="1rem">
//             <Select options={generateGrados(salones)} width="14rem" name="grado" label="grado" />
//             {grado && <Select key={grado} options={generateSecciones(grado, salones)} width="9rem" name="seccion" label="sección" />}
//             {data && registro && (
//               <Button $width="max-content" $primary onClick={() => mutate()} type="button" disabled={isPending} $small>
//                 Grabar Cambios
//               </Button>
//             )}
//           </Container>
//           {currentPeriodo && (
//             <Container $bgColor={theme.colors.tertiary.light} $width="100%" $padding="1rem">
//               <Text $primary $large $fontWeight="700">
//                 {convertPeriodoKeyToLabel(currentPeriodo as Periodo)}
//               </Text>
//             </Container>
//           )}
//           {currentPeriodo && data && registro && <RegistroTable periodo={currentPeriodo as Periodo} registro={{ isTutor: isTutor!, notas: registro as any }}></RegistroTable>}
//         </Container>
//       </RegistroContext.Provider>
//     </>
//   );

//   //functions

//   async function fetchRegistro({ grado, seccion }: { grado: Grado | null; seccion: Seccion | null }) {
//     if (!grado || !seccion) {
//       return undefined;
//     }
//     const salon = profesor!.salones.find((salon) => {
//       return salon.value.grado === grado && salon.value.seccion === seccion;
//     })!;

//     const response = await Profesor.fetchRegistroBySalon({ salon });
//     if (!response.data.ok) {
//       throw new Error(response.data.message);
//     }

//     return response.data.payload;
//   }

//   async function updateRegistroProfesor(registro: RegistroNotasProfesor, isTutor: boolean) {
//     const response = await Profesor.updateRegistroProfesor({ registro, isTutor });
//     updateToken(response);
//     if (!response.data.ok) throw new Error(response.data.message);
//     queryClient.invalidateQueries();
//     toaster.success('Registro guardado');
//     return response.data.ok;
//   }
// }
