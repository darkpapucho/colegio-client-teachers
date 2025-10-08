import { RegistroPrimariaActions } from './RegistroPrimariaReducer';
import { CURSO_SALON, RecordNotas } from '../../../../types/notas';
import { Container } from '../../../../components/Shared/Container/Container';
import { Button } from '../../../../components/Shared/Button/Button';
import { theme } from '../../../../config/styled/styled';
import useRegistroPrimaria from '../../../../hooks/useRegistroPrimaria';
import { useProfesor } from '../../../../hooks/useProfesor';
import { createContext } from 'react';
import RegistroTable from './Table';
import { Periodo } from '../../../../types/gradoSalon';
import Loader from '../../../../components/Shared/Loader/Loader';
import useUpdateRegistroPrimaria from '../../../../hooks/useUpdateRegistroPrimaria';
import SalonesFilter from '../../../SalonesFilter.tsx/SalonesFilter';

type ContextType = {
  registro: RecordNotas[];
  dispatch: React.Dispatch<RegistroPrimariaActions>;
  isFetching: boolean;
  cursosProfesor: CURSO_SALON[] | undefined;
};

export const RegistroPrimariaContext = createContext<ContextType | null>(null);

export default function RegistroTablePrimaria({ periodo }: { periodo: Periodo }) {
  // const { grado, setSearchParams } = useGradoSeccionSearchParams();
  const { registro, dispatch, isFetching, cursosProfesor } = useRegistroPrimaria();
  const profesor = useProfesor((state) => state.profesor)!;
  const salones = profesor.salones;

  const { mutate, isPending } = useUpdateRegistroPrimaria({ registro, cursosProfesor });
  if (isFetching) {
    return <Loader />;
  }
  // useLayoutEffect(() => {
  //   setSearchParams((old) => {
  //     old.set('grado', generateGrados(salones)[0].value);
  //     return old;
  //   });
  // }, []);
  return (
    <RegistroPrimariaContext.Provider value={{ registro, dispatch, cursosProfesor, isFetching }}>
      <Container $direction="column" $padding="2rem" $gap="2rem" $width="100%">
        <Container $direction="row" $width="100%" $bgColor={theme.colors.tertiary.light} $padding="1rem" $gap="1rem">
          <SalonesFilter salones={salones} />
          {registro && registro.length > 0 && (
            <Button $width="max-content" $primary onClick={() => mutate()} type="button" disabled={isPending || isFetching} $small>
              Grabar Cambios
            </Button>
          )}
        </Container>
        <Container $width="100%" $direction="column" $gap="1rem">
          {cursosProfesor.length > 0 && <RegistroTable registro={registro} cursosProfesor={cursosProfesor} periodo={periodo} />}
        </Container>
      </Container>
    </RegistroPrimariaContext.Provider>
  );
}
