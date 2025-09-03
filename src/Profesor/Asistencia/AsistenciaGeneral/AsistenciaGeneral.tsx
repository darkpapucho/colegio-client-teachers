import { useEffect, useState } from 'react';
import { useImmerReducer } from 'use-immer';
import { Button } from '../../../components/Shared/Button/Button';
import { Container } from '../../../components/Shared/Container/Container';
import Loader from '../../../components/Shared/Loader/Loader';
import Select from '../../../components/Shared/Select/Select';
import { theme } from '../../../config/styled/styled';
import useCalendarioEscolar from '../../../hooks/useCalendarioEscolar';
import useCustomEvent from '../../../hooks/useCustomEvent';
import { CalendarioList } from '../../../types/calendar';
import { getClosestDay, getCurrentMonthName, MONTH_NAME } from '../../AsistenciaRecords/utils';
import AsistenciasReducer, { AsistenciasReducerState, AsistenciasReducerAction } from '../AsistenciasReducer';
import { MONTHS_SELECT_OPTIONS } from '../../../var/calendario';
import PasarAsistenciasTable from './PasarAsistenciaTable';
import useFetchAsistenciaListByDayId from '../../../hooks/useFetchAsistenciaListByDayId';
import useGradoSeccionSearchParams from '../../../hooks/useGradoSeccionSearchParams';
import { useProfesor } from '../../../hooks/useProfesor';
import { generateGrados, generateSecciones } from '../../../utils/profesor';
import useUpdateAsistenciaListGeneral from '../../../hooks/useUpdateAsistenciaListGeneral';
import { DaysContainer } from './DaysContainer';

export default function PasarAsistencia() {
  const profesor = useProfesor((state) => state.profesor);
  const salonesList = profesor!.salones.filter((salon) => {
    return salon.tutor;
  });

  const { months, isLoading: isLoadingCalendario, isFetching, refetch } = useCalendarioEscolar();

  const { searchParams, setSearchParams, grado } = useGradoSeccionSearchParams();
  const [selectedMonth, setSelectedMonth] = useState<MONTH_NAME>(getCurrentMonthName());
  const [selectedDay, setSelectedDay] = useState<Omit<CalendarioList, 'month'> | undefined>(undefined);

  const { data, isLoading, refetch: fetchAsistenciaList } = useFetchAsistenciaListByDayId({ searchParams, dayId: selectedDay?._id, month: selectedMonth });

  const [registroAsistencia, dispatch] = useImmerReducer<AsistenciasReducerState, AsistenciasReducerAction>(AsistenciasReducer, []);

  const { mutate, isPending: isUpdating } = useUpdateAsistenciaListGeneral({
    searchParams,
    month: selectedMonth,
    registroAsistencia,
    dayId: selectedDay?._id,
    day: selectedDay?.day,
  });

  useCustomEvent('customSelect', monthSelectListener);
  useCustomEvent('customSelect', selectListener);
  // useEffect(() => {
  //   if (selectedMonth) {
  //     setSelectedDay(getClosestDay(months[selectedMonth]));
  //   }
  // }, [selectedMonth]);
  useEffect(() => {
    setSelectedDay(getClosestDay(months, selectedMonth));
  }, [months]);
  useEffect(() => {
    if (!data) return;
    const registroAsistencias: AsistenciasReducerState = data.asistenciaList.map((record) => {
      return { ...record, asistencia: record.asistencia };
    });
    dispatch({ type: 'setRegistro', payload: registroAsistencias });
    // setDayId(data.dayId);
  }, [data]);
  return (
    <>
      {isUpdating || isLoadingCalendario || isLoading || (isFetching && <Loader />)}
      <Container $direction="column" $gap="1rem" $padding="2rem 0" $height="max-content">
        <h2>Pasar asistencia</h2>
        <Container $direction="column" $gap="1rem">
          <Container $direction="row" $gap="1rem" $height="30px">
            <Select
              heigth="30px"
              width="10rem"
              options={MONTHS_SELECT_OPTIONS}
              defaultValue={selectedMonth ? { label: selectedMonth, value: selectedMonth } : undefined}
              name="month"
              label="month"
            />
            <Button $primary onClick={() => refetch()} disabled={isFetching} $width="max-content">
              Reload Calendar Days
            </Button>
          </Container>
          {selectedMonth && (
            <DaysContainer $direction="row" $gap="0.3rem">
              {[...months[selectedMonth]]
                .sort((prev, curr) => (prev.day > curr.day ? 1 : -1))
                .map((element) => {
                  return (
                    <Container
                      $width="25px"
                      $justifyContent="center"
                      key={element._id}
                      $padding=".5rem"
                      $border="1px solid black"
                      $bgColor={selectedDay?._id === element._id ? theme.colors.primary.light : theme.colors.secondary.light}
                      $pointer
                      onClick={() => setSelectedDay(element)}>
                      {element.day}
                    </Container>
                  );
                })}
            </DaysContainer>
          )}
        </Container>
        <Container $gap="1rem" $height="30px">
          <Select options={generateGrados(salonesList)} width="14rem" name="grado" label="grado" />
          {grado && <Select key={grado} options={generateSecciones(grado, salonesList)} width="9rem" name="seccion" label="sección" />}
          <Button $primary onClick={() => fetchAsistenciaList()} $width="max-content">
            Descargar Lista
          </Button>
        </Container>
        {data && data.asistenciaList.length > 0 && (
          <Container $direction="column" $gap="1rem">
            <Button disabled={isUpdating} $color="green" $width="max-content" onClick={() => mutate()} $small>
              Guardar Cambios
            </Button>
            <PasarAsistenciasTable dispatch={dispatch} alumnos={registroAsistencia} />
          </Container>
        )}
      </Container>
    </>
  );

  function monthSelectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    // const currentMonthName = getCurrentMonthName();
    if (name === 'month') {
      setSelectedMonth(value);

      // if (value !== currentMonthName) {
      //   setSelectedDay(undefined);
      // } else {
      setSelectedDay(getClosestDay(months, value));
      // }
    } else if (name === 'grado' || name === 'seccion') {
      setSearchParams((old) => {
        old.set(name, value);
        return old;
      });
    }
  }
  function selectListener(event: CustomEvent) {
    const { name, value } = event.detail;

    const params = name.split('-');
    if (params[0] === 'asistencia') {
      dispatch({ type: 'updateAsistencia', payload: { alumnoId: params[1], value } });
    }
  }
}
