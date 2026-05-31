import Table from '../../../../components/Shared/Table/Table';
import { nivelState } from '../../../../config/zustand/nivel';
import GetTableDataFromRegistro from '../utils';
import { RegistroNotasInicialProfesor, CursoInfo } from '../../../../models/Profesor/types';
import RegistroTableHeader from './RegistroTableHeader';
import { Grado, Nivel, Periodo, Seccion } from '../../../../types/gradoSalon';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createContext, Dispatch, useEffect, useState } from 'react';
import useCurrentPeriodo from '../../../../hooks/useCurrentPeriodo';
import RegistroInicialReducer, { RegistroInicialReducerAction } from './registroInicialReducer';
import { useImmerReducer } from 'use-immer';
import { queryClient } from '../../../../config/reactQuery/reactQuery';
import ErrorHandler from '../../../../utils/errorManagment';
import { Profesor } from '../../../../models/Profesor/Profesor';
import { updateToken } from '../../../../utils/axiosUtils';
import toaster from 'react-hot-toast';
import Loader from '../../../../components/Shared/Loader/Loader';
import EditConClusionesDescriptivasModal from '../EditConclusionesDescriptivasModal';
import { Button } from '../../../../components/Shared/Button/Button';
import { Container } from '../../../../components/Shared/Container/Container';
import { theme } from '../../../../config/styled/styled';
import RegistroTableBody from './RegistroTableBody';
import SalonesFilter from '../../../SalonesFilter.tsx/SalonesFilter';
import useGradoSeccionSearchParams from '../../../../hooks/useGradoSeccionSearchParams';
import useAuth from '../../../../config/zustand/user';
import { Teacher } from '../../../../config/zustand/types/teacher';

export const RegistroContext = createContext<{
  dispatch: (action: RegistroInicialReducerAction) => void;
  setConclusionesDescriptivasModalData: Dispatch<
    React.SetStateAction<{
      alumnoId: string;
      periodo: Periodo;
      data: string;
      apellidos: string;
      nombres: string;
    } | null>
  >;
  periodo: Periodo;
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
  conclusionesDescriptivasModalData: {
    alumnoId: string;
    periodo: Periodo;
    data: string;
    apellidos: string;
    nombres: string;
  } | null;
} | null>(null);

export default function RegistroTableInicial() {
  const nivel = nivelState((state) => state.nivel) as Nivel;
  const { currentPeriodo, isLoading } = useCurrentPeriodo();
  const periodo = (currentPeriodo || 'primerPeriodo') as Periodo;
  const profesor = useAuth().user as unknown as Teacher;
  const salones = profesor.salones;
  const { grado, seccion } = useGradoSeccionSearchParams();

  //isTutor? in order to update registro, this field is necesary
  // const isTutor = salones.find((salon) => salon.value.grado === grado && salon.value.seccion === seccion)?.tutor ?? false;

  // const isTutor = profesor.salones.some((salon) => salon.value.grado === grado && salon.value.seccion === seccion && salon.tutor);
  const isTutor = true;
  //useQuery
  const { isFetching, error, data, refetch } = useQuery({
    queryKey: ['registro-profesor', grado, seccion],
    queryFn: () => fetchRegistro({ grado, seccion }),
    refetchOnWindowFocus: false,
    // enabled: grado != null && seccion != null,
    enabled: false,
  });
  const [registro, dispatchRegistro] = useImmerReducer<RegistroNotasInicialProfesor[], RegistroInicialReducerAction>(
    RegistroInicialReducer,
    [],
  );

  const {
    mutate,
    isPending,
    error: mutateError,
  } = useMutation({
    mutationKey: ['updated-registro-profesor'],
    mutationFn: () => updateRegistroProfesor(registro, isTutor),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['registro-profesor', grado, seccion] });
      queryClient.prefetchQuery({
        queryKey: ['registro-profesor', grado, seccion],
        queryFn: () => fetchRegistro({ grado, seccion }),
      });
    },
  });

  const [showModal, setShowModal] = useState(false);

  const [conclusionesDescriptivasModalData, setConclusionesDescriptivasModalData] = useState<{
    alumnoId: string;
    periodo: Periodo;
    data: string;
    nombres: string;
    apellidos: string;
  } | null>(null);

  const [gridTemplateColumns, setGridTemplateColumns] = useState('');
  const [cursosList, setCursosList] = useState<CursoInfo[] | undefined>(undefined);
  useEffect(() => {
    if (!data) return;

    dispatchRegistro({
      type: 'setRegistro',
      payload: [...data],
    });

    const result = GetTableDataFromRegistro({ isTutor: isTutor, notas: data as any }, nivel);
    setGridTemplateColumns(result.gridTemplateColumns);
    setCursosList(result.cursosList);
  }, [data]);

  useEffect(() => {
    if (error) {
      ErrorHandler(error);
    } else if (mutateError) {
      ErrorHandler(mutateError);
    }
  }, [error, mutateError]);

  // if (registro && registro.notas.length === 0) {
  //   return <>Lista vacía</>;
  // }
  if (registro) {
    return (
      <>
        {(isFetching || isPending || isLoading) && <Loader />}
        <RegistroContext.Provider
          value={{
            dispatch: dispatchRegistro,
            setConclusionesDescriptivasModalData,
            periodo: periodo as Periodo,
            setShowModal,
            conclusionesDescriptivasModalData,
          }}>
          {showModal && isTutor && (
            <EditConClusionesDescriptivasModal
              onCloseModal={() => setShowModal(false)}
              data={conclusionesDescriptivasModalData}
              saveHandler={saveConclusionesDescriptivas}></EditConClusionesDescriptivasModal>
          )}
          <Container $direction="row" $width="100%" $bgColor={theme.colors.tertiary.light} $padding="1rem" $gap="1rem">
            <SalonesFilter salones={salones} />
            {/* <Select options={generateGrados(salones)} width="14rem" name="grado" label="grado" defaultValue={generateGrados(salones)[0]} />
            {grado && <Select key={grado} options={generateSecciones(grado, salones)} width="9rem" name="seccion" label="sección" defaultValue={{ label: 'A', value: 'A' }} />} */}
            <Button $width="max-content" $primary onClick={() => refetch()} type="button" $small>
              {' '}
              Descargar Registro
            </Button>
            {data && registro && (
              <Button
                $width="max-content"
                $color="green"
                onClick={() => mutate()}
                type="button"
                disabled={isPending}
                $small>
                Grabar Cambios
              </Button>
            )}
          </Container>
          {gridTemplateColumns && cursosList && (
            <Table $gridTempCols={gridTemplateColumns} $justifyContent="center" $alignItems="center" $height="30px">
              <RegistroTableHeader cursosList={cursosList!} isTutor={isTutor!} />
              <RegistroTableBody
                periodo={periodo as Periodo}
                registro={{ isTutor, notas: registro as any }}
                cursosList={cursosList!}
              />
            </Table>
          )}
        </RegistroContext.Provider>
      </>
    );
  }
  async function fetchRegistro({ grado, seccion }: { grado: Grado | null; seccion: Seccion | null }) {
    if (!grado || !seccion) {
      return undefined;
    }
    const salon = profesor!.salones.find((salon) => {
      return salon.value.grado === grado && salon.value.seccion === seccion;
    })!;

    const response = await Profesor.fetchRegistroBySalon({ salon });
    updateToken(response);
    if (!response.data.ok) {
      throw new Error(response.data.message);
    }

    return response.data.payload;
  }

  async function updateRegistroProfesor(registro: RegistroNotasInicialProfesor[], isTutor: boolean) {
    const response = await Profesor.updateRegistroProfesor({ registro, isTutor });
    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    queryClient.invalidateQueries();
    toaster.success('Registro guardado');
    return response.data.ok;
  }
  function saveConclusionesDescriptivas(value: string) {
    dispatchRegistro({
      type: 'updateConclusionesDescriptivas',
      payload: {
        alumnoId: conclusionesDescriptivasModalData!.alumnoId,
        periodo: conclusionesDescriptivasModalData!.periodo,
        data: value,
      },
    });
    setShowModal(false);
  }
}
