import { useState, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { Button } from '../../../components/Shared/Button/Button';
import { Container } from '../../../components/Shared/Container/Container';
import { theme } from '../../../config/styled/styled';
import useCustomEvent from '../../../hooks/useCustomEvent';
import useFetchAsistenciaList from '../../../hooks/useFetchAsistenciaList';

import { useProfesor } from '../../../hooks/useProfesor';
import useUpdateAsistenciaList from '../../../hooks/useUpdateAsistenciaList';

import AsistenciasReducer, { AsistenciasReducerState, AsistenciasReducerAction } from '../AsistenciasReducer';
import AsistenciasTable from './AsistenciasTable/AsistenciasTable';
import { Text } from '../../../components/Shared/Text/Text';
import Loader from '../../../components/Shared/Loader/Loader';
import SalonesFilter from '../../SalonesFilter.tsx/SalonesFilter';
import { useSearchParams } from 'react-router-dom';

export default function AsistenciaDiaria() {
  const [searchParams] = useSearchParams();
  const month = new Date().toLocaleDateString('ES-es', { month: 'long' });
  const day = new Date().getDate();
  const profesor = useProfesor((state) => state.profesor);
  // const salones = profesor!.salones;
  // const { grado, seccion } = useGradoSeccionSearchParams();
  const salonesList = profesor?.salones.filter((salon) => {
    return salon.tutor;
  });
  const [dayId, setDayId] = useState('');
  const { data, isFetching, refetch } = useFetchAsistenciaList({ month, day });
  const [registroAsistencia, dispatch] = useImmerReducer<AsistenciasReducerState, AsistenciasReducerAction>(AsistenciasReducer, []);

  const { mutate, isPending } = useUpdateAsistenciaList({
    registroAsistencia,
    month,
    day,
    dayId,
  });

  // useEffect(() => {
  //   setSearchParams((old) => {
  //     old.set('periodo', currentPeriodo ? currentPeriodo : 'primerPeriodo');
  //     console.log(old);
  //     return old;
  //   });
  // }, [currentPeriodo]);

  useEffect(() => {
    if (!data) return;
    const registroAsistencias: AsistenciasReducerState = data.asistenciaList.map((record) => {
      return { ...record, asistencia: record.asistencia };
    });
    dispatch({ type: 'setRegistro', payload: registroAsistencias });
    setDayId(data.dayId);
  }, [data]);

  useCustomEvent('customSelect', selectListener);

  if (!salonesList || salonesList.length === 0) {
    return <>Usted no es tutor de ningun salón</>;
  }
  return (
    <>
      {(isFetching || isPending) && <Loader />}
      <Container $direction="row" $width="100%" $bgColor={theme.colors.tertiary.light} $padding="1rem 1rem 4rem 1rem" $gap="1rem">
        <Container $direction="row" $width="max-content" $gap="1rem">
          <SalonesFilter salones={salonesList} />
          <Button $primary onClick={() => refetch()} $width="max-content" $small disabled={isFetching}>
            Descargar Lista
          </Button>
        </Container>
        {data && registroAsistencia && (
          <Button $width="max-content" $primary onClick={() => mutate()} type="button" disabled={isPending} $small>
            Grabar Cambios
          </Button>
        )}
      </Container>
      {searchParams.get('grado') && searchParams.get('seccion') && (
        <Container $bgColor={theme.colors.tertiary.light} $width="100%" $padding="1rem">
          <Text $large $secondary $fontWeight="600">{`Asistencia ${new Date().toLocaleDateString('ES-es', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}`}</Text>
        </Container>
      )}
      {data && registroAsistencia && <AsistenciasTable alumnos={registroAsistencia} dispatch={dispatch}></AsistenciasTable>}
    </>
  );
  function selectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    const params = name.split('-');
    if (params[0] === 'asistencia') {
      dispatch({ type: 'updateAsistencia', payload: { alumnoId: params[1], value } });
    }
  }
}
