import { useEffect } from 'react';
import { Button } from '../../components/Shared/Button/Button';
import { Container } from '../../components/Shared/Container/Container';
import Loader from '../../components/Shared/Loader/Loader';
import useGradoSeccionSearchParams from '../../hooks/useGradoSeccionSearchParams';
import Calendario from '../../models/Calendario/Calendario';
import { updateToken } from '../../utils/axiosUtils';
import AsistenciaTable from './SubComponents/AsistenciaTable';
import { useQuery } from '@tanstack/react-query';
import { Text } from '../../components/Shared/Text/Text';
import ErrorHandler from '../../utils/errorManagment';
import { EstadoMatricula, Grado, Periodo, Seccion } from '../../types/gradoSalon';
import { useProfesor } from '../../hooks/useProfesor';
import { theme } from '../../config/styled/styled';
import { yearState } from '../../config/zustand/year';

import SalonesFilter from '../SalonesFilter.tsx/SalonesFilter';
import useCurrentPeriodo from '../../hooks/useCurrentPeriodo';

export default function AsistenciaAlumnos() {
  const { currentPeriodo, isLoading } = useCurrentPeriodo();
  const year = yearState((state) => state.year);
  const profesor = useProfesor((state) => state.profesor);
  const salonesList = profesor!.salones.filter((salon) => {
    return salon.tutor;
  });
  const currentYear = new Date().getFullYear(); // YYYY
  const { searchParams } = useGradoSeccionSearchParams();

  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['asistencia-list', searchParams.get('grado'), searchParams.get('seccion')],
    queryFn: () => requestRecords(),
    enabled: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    if (!error) return;
    ErrorHandler(error);
  }, [error]);

  if (isLoading || isFetching) return <Loader />;
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
      {(isFetching || isLoading) && <Loader />}
      <Container $padding="2rem" $direction="column" $gap="2rem">
        <Container $direction="row" $width="100%" $bgColor={theme.colors.tertiary.light} $padding="1rem" $gap="1rem">
          <SalonesFilter salones={salonesList} />
          <Button $width="max-content" $primary onClick={() => refetch()} type="button" disabled={isFetching} $small>
            Ver Lista
          </Button>
          <Button $width="max-content" $primary onClick={() => downloadPDF()} type="button" disabled={isFetching} $small>
            Descargar PDF
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

  async function requestRecords() {
    const periodo = currentPeriodo;
    const grado = searchParams.get('grado') as Grado | null;
    const seccion = searchParams.get('seccion') as Seccion | null;
    if (!periodo || !grado || !seccion) {
      throw new Error('Debes seleccioon un grado, una sección y un periodo');
    }
    const response = await Calendario.getRecordAsistenciaAlumnos({ grado, seccion, periodo });
    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    return response.data.payload;
  }

  async function downloadPDF() {
    const grado = searchParams.get('grado') as Grado | null;
    const seccion = searchParams.get('seccion') as Seccion | null;
    try {
      if (!grado || !seccion) throw new Error('Ningun grado ni sección fue especificado');
      const periodo = searchParams.get('periodo') as Periodo;
      const estadosMatricula: EstadoMatricula[] = ['DEFINITIVA', 'EN PROCESO'];
      if (!periodo || !estadosMatricula) throw new Error('[EstadosMatricula - Con Datos - Periodo] error');

      const response = await Calendario.downloadPDFAsistenciaList({
        estadosMatricula,
        grado,
        seccion,
        periodo,
        withData: true,
      });
      updateToken(response);
      const blob = new Blob([response.data]);
      const url = URL.createObjectURL(blob);
      const alink = document.createElement('a');
      alink.href = url;
      alink.download = `asistencia-${grado}-${seccion}-${periodo}.pdf`;
      alink.click();
      alink.remove();
    } catch (err) {
      ErrorHandler(err);
    }
  }
}
