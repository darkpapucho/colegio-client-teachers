import RegistroPrimariaReducer, { RegistroPrimariaActions } from './RegistroPrimariaReducer';
import { CURSO_SALON, RecordNotas } from '../../../../types/notas';
import { Container } from '../../../../components/Shared/Container/Container';
import { Button } from '../../../../components/Shared/Button/Button';
import { theme } from '../../../../config/styled/styled';
import { createContext, useEffect, useState } from 'react';
import RegistroTable from './RegistroTable';
import { Periodo } from '../../../../types/gradoSalon';
import Loader from '../../../../components/Shared/Loader/Loader';
import SalonesFilter from '../../../SalonesFilter.tsx/SalonesFilter';

import ErrorHandler from '../../../../utils/errorManagment';
import { useImmerReducer } from 'use-immer';
import Notas from '../../../../models/Notas/Notas';
import { updateToken } from '../../../../utils/axiosUtils';
import toaster from 'react-hot-toast';
import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
import useAuth from '../../../../config/zustand/user';
import { Teacher } from '../../../../config/zustand/types/teacher';

type ContextType = {
  registro: RecordNotas[];
  dispatch: React.Dispatch<RegistroPrimariaActions>;
  isFetching: boolean;
  cursosProfesor: CURSO_SALON[] | undefined;
};

export const RegistroPrimariaContext = createContext<ContextType | null>(null);

export default function RegistroTablePrimaria({ periodo }: { periodo: Periodo }) {
  const [loading, setLoading] = useState<boolean>(false);
  const { grado, seccion } = useGradoSeccionSearchParams();
  const profesor = useAuth().user as unknown as Teacher;
  const cursosProfesor = profesor.salones.find((salon) => salon.label === `${grado} ${seccion}`)?.cursos ?? [];
  const isTutor = profesor.salones.some((salon) => salon.label === `${grado} ${seccion}` && salon.tutor);
  const [registro, dispatch] = useImmerReducer<RecordNotas[], RegistroPrimariaActions>(RegistroPrimariaReducer, []);
  const salones = profesor.salones;
  useEffect(() => {
    dispatch({ type: 'set-register', payload: [] });
  }, [grado, seccion]);
  if (loading) {
    return <Loader />;
  }
  // useLayoutEffect(() => {
  //   setSearchParams((old) => {
  //     old.set('grado', generateGrados(salones)[0].value);
  //     return old;
  //   });
  // }, []);

  return (
    <RegistroPrimariaContext.Provider value={{ registro, dispatch, cursosProfesor, isFetching: loading }}>
      <Container $direction="column" $padding="2rem" $gap="2rem" $width="100%">
        <Container $direction="row" $width="100%" $bgColor={theme.colors.tertiary.light} $padding="1rem" $gap="1rem">
          <SalonesFilter salones={salones} />
          <Button $primary $width="max-content" onClick={() => buscarRegistro()} type="button" disabled={loading}>
            {' '}
            Buscar{' '}
          </Button>
          {registro && registro.length > 0 && (
            <Button
              $width="max-content"
              $primary
              onClick={() => updateRegistro({ registro, isTutor, cursosProfesor })}
              type="button"
              disabled={loading}
              $small>
              Grabar Cambios
            </Button>
          )}
        </Container>
        <Container $width="100%" $direction="column" $gap="1rem">
          {registro && registro.length > 0 ? (
            <RegistroTable registro={registro} cursosProfesor={cursosProfesor} periodo={periodo} />
          ) : (
            <></>
          )}
        </Container>
      </Container>
    </RegistroPrimariaContext.Provider>
  );

  async function buscarRegistro() {
    try {
      setLoading(true);
      if (!grado || !seccion) throw new Error('Grado y sección son requeridos');
      const response = await Notas.fetchRegistroPrimaria({ grado, seccion, cursosProfesor, isTutor });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      dispatch({ type: 'set-register', payload: response.data.payload });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      ErrorHandler(error);
    }
  }
  async function updateRegistro({
    registro,
    isTutor,
    cursosProfesor,
  }: {
    registro: RecordNotas[];
    isTutor: boolean;
    cursosProfesor: CURSO_SALON[];
  }) {
    try {
      if (!registro || !cursosProfesor) throw new Error('falta el registro o la lista de cursos del profesor');
      setLoading(true);
      const response = await Notas.updateRecordNotasPrimaria({ registro, isTutor, cursosProfesor });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);

      setLoading(false);
      toaster.success('registro actualizado exitosamente');
    } catch (error) {
      setLoading(false);
      ErrorHandler(error);
    }
  }
}
