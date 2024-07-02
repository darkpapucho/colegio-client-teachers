import { useEffect } from 'react';
import { Button } from '../../components/Shared/Button/Button';
import { Container } from '../../components/Shared/Container/Container';
import Loader from '../../components/Shared/Loader/Loader';
import Select from '../../components/Shared/Select/Select';
import useCustomEvent from '../../hooks/useCustomEvent';
import useGradoSeccionSearchParams from '../../hooks/useGradoSeccionSearchParams';
import Calendario from '../../models/Calendario/Calendario';
import { updateToken } from '../../utils/axiosUtils';
import AsistenciaTable from './SubComponents/AsistenciaTable';
import { useQuery } from '@tanstack/react-query';
import { Text } from '../../components/Shared/Text/Text';
import ErrorHandler from '../../utils/errorManagment';
import { Grado, Periodo, Seccion } from '../../types/gradoSalon';
import { useProfesor } from '../../hooks/useProfesor';
import { generateGrados, generateSecciones } from '../../utils/profesor';
import { theme } from '../../config/styled/styled';
import { yearState } from '../../config/zustand/year';
import { SELECT_PERIODOS } from '../../var/selectOptions';

export default function AsistenciaAlumnos() {
  const year = yearState((state) => state.year);
  const profesor = useProfesor((state) => state.profesor);
  const salonesList = profesor?.salones.filter((salon) => {
    return salon.tutor;
  });
  const currentYear = new Date().getFullYear(); // YYYY
  const { grado, seccion, setSearchParams, searchParams } = useGradoSeccionSearchParams();
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['asistencia-list', grado, seccion, searchParams.get('periodoo')],
    queryFn: () => requestRecords({ grado, seccion }),
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useCustomEvent('customSelect', periodoListener);

  useEffect(() => {
    if (!error) return;
    ErrorHandler(error);
  }, [error]);

  if (year !== currentYear) {
    return (
      <Container $padding="2rem">
        <Text>{`Esta operación solo está disponible en el año ${year}`}</Text>
      </Container>
    );
  }
  if (salonesList?.length === 0) {
    return <Container $padding="2rem">No eres tutor de ninguna sección.</Container>;
  }
  return (
    <>
      {isFetching && <Loader />}
      <Container $padding="2rem" $direction="column" $gap="2rem">
        <Container $direction="row" $width="100%" $bgColor={theme.colors.gray.light} $padding="1rem" $gap="1rem">
          <Select options={SELECT_PERIODOS} width="14rem" name="periodo" label="periodo" />
          <Select options={generateGrados(salonesList!)} width="14rem" name="grado" label="grado" />
          {grado && <Select key={grado} options={generateSecciones(grado, salonesList!)} width="9rem" name="seccion" label="sección" />}
          <Button $width="max-content" $primary onClick={() => refetch()} type="button" disabled={isFetching} $small>
            Ver Lista
          </Button>
        </Container>
        {data?.asistencias && data.asistencias.length > 0 && (
          <Container>
            <AsistenciaTable asistencias={data.asistencias} availableDays={data.availableDays} />
          </Container>
        )}
      </Container>
    </>
  );
  function periodoListener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'periodo') {
      setSearchParams((prev) => {
        prev.set('periodo', value);
        return prev;
      });
    }
  }
  async function requestRecords({ grado, seccion }: { grado: Grado | null; seccion: Seccion | null }) {
    const periodo = searchParams.get('periodo') as Periodo | null;
    if (!periodo || !grado || !seccion) {
      throw new Error('Debes seleccioon un grado, una sección y un periodo');
    }
    const response = await Calendario.getRecordAsistenciaAlumnos({ grado, seccion, periodo });
    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    return response.data.payload;
  }
}
