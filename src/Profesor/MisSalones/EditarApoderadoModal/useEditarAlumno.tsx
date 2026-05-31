// import { MutationFunction, useMutation } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { queryClient } from "../../../config/reactQuery/reactQuery";
// import useGradoSeccionSearchParams from "../../../hooks/useGradoSeccionSearchParams";
// import { Year } from "../../../types/gradoSalon";

// export default function useEditarAlumno(handleSubmit: MutationFunction<unknown, void>, finalizer: () => void) {
//   const { grado, seccion } = useGradoSeccionSearchParams();
//   const año = useTypedSelector((state) => state.año) as Year;
//   const {
//     error,
//     isError,
//     isLoading,
//     mutate: editarAlumno,
//     isSuccess,
//   } = useMutation({
//     mutationFn: () => handleSubmit(),
//     mutationKey: ['editar-alumno'],
//   });
//   useEffect(() => {
//     if (isSuccess === true) {
//       queryClient.invalidateQueries(['matriculados', grado, seccion, año]);
//       queryClient.prefetchQuery({ queryKey: ['matriculados', grado, seccion, año], queryFn: () => handleFetchMatriculados({ grado, seccion }) });
//       finalizer(); //cerrar el card
//     }
//   }, [isSuccess]);
//   useEffect(() => {
//     if (error != null) {
//       errorHandler(error);
//     }
//   }, [isError]);
//   return { error, isError, isSuccess, editarAlumno, isLoading };
// }
