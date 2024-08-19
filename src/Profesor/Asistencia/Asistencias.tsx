import { Button } from '../../components/Shared/Button/Button';
import { Container } from '../../components/Shared/Container/Container';
import Select from '../../components/Shared/Select/Select';
import { theme } from '../../config/styled/styled';
import useGradoSeccionSearchParams from '../../hooks/useGradoSeccionSearchParams';
import { useProfesor } from '../../hooks/useProfesor';
import { generateGrados, generateSecciones } from '../../utils/profesor';
import Loader from '../../components/Shared/Loader/Loader';
import { useEffect, useState } from 'react';
import { useImmerReducer } from 'use-immer';
import AsistenciasReducer, { AsistenciasReducerAction, AsistenciasReducerState } from './AsistenciasReducer';
import AsistenciasTable from './AsistenciasTable/AsistenciasTable';
import useCustomEvent from '../../hooks/useCustomEvent';

import useFetchAsistenciaList from '../../hooks/useFetchAsistenciaList';
import useUpdateAsistenciaList from '../../hooks/useUpdateAsistenciaList';
import { Text } from '../../components/Shared/Text/Text';
import useConvertDateToperiodo from '../../hooks/useConvertDateToPeriodo';
import { Periodo } from '../../types/gradoSalon';

export default function Asistencias() {
  const { data: currentPeriodo, isLoading } = useConvertDateToperiodo();
  const periodo = currentPeriodo || 'primerPeriodo';
  const month = new Date().toLocaleDateString('ES-es', { month: 'long' });
  const day = new Date().getDate();
  const profesor = useProfesor((state) => state.profesor);
  // const salones = profesor!.salones;
  const { grado, seccion } = useGradoSeccionSearchParams();
  const salonesList = profesor?.salones.filter((salon) => {
    return salon.tutor;
  });
  const [dayId, setDayId] = useState('');
  const { data, isFetching } = useFetchAsistenciaList({ grado, seccion, month, day });
  const [registroAsistencia, dispatch] = useImmerReducer<AsistenciasReducerState, AsistenciasReducerAction>(AsistenciasReducer, []);

  const { mutate, isPending } = useUpdateAsistenciaList({
    registroAsistencia,
    month,
    day,
    grado: grado!,
    seccion: seccion!,
    periodo: periodo as Periodo,
    dayId,
  });

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
    <Container $direction="column" $gap="2rem" $width="100%">
      {isFetching || (isLoading && <Loader />)}
      <Container $direction="row" $width="100%" $bgColor={theme.colors.tertiary.light} $padding="1rem 1rem 4rem 1rem" $gap="1rem">
        <Select options={generateGrados(salonesList)} width="14rem" name="grado" label="grado" />
        {grado && <Select key={grado} options={generateSecciones(grado, salonesList)} width="9rem" name="seccion" label="sección" />}
        {data && registroAsistencia && (
          <Button $width="max-content" $primary onClick={() => mutate()} type="button" disabled={isPending} $small>
            Grabar Cambios
          </Button>
        )}
      </Container>
      {grado && seccion && (
        <Container $bgColor={theme.colors.tertiary.light} $width="100%" $padding="1rem">
          <Text $large $secondary $fontWeight="600">{`Asistencia ${new Date().toLocaleDateString('ES-es', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}`}</Text>
        </Container>
      )}
      {data && registroAsistencia && <AsistenciasTable alumnos={registroAsistencia} dispatch={dispatch}></AsistenciasTable>}
    </Container>
  );

  function selectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    const params = name.split('-');
    if (params[0] === 'asistencia') {
      dispatch({ type: 'updateAsistencia', payload: { alumnoId: params[1], value } });
    }
  }
}
