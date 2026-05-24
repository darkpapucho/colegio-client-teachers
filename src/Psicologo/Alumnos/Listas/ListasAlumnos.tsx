import { useEffect } from 'react';
import { Button } from '../../../components/Shared/Button/Button';
import { Container } from '../../../components/Shared/Container/Container';
import Select from '../../../components/Shared/Select/Select';
import { nivelState } from '../../../config/zustand/nivel';
import useCustomEvent from '../../../hooks/useCustomEvent';
import useGradoSeccionSearchParams from '../../../hooks/useGradoSeccionSearchParams';
import Alumno from '../../../models/Alumno/Alumno';

import { Nivel } from '../../../types/gradoSalon';
import { updateToken } from '../../../utils/axiosUtils';
import { GRADOS_SELECT_OPTIONS, SECCION_SELECT_OPTIONS } from '../../../utils/salones';
import Loader from '../../../components/Shared/Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import AlumnosTablePsicologia from './AlumnosTablePsicologia';
import ErrorHandler from '../../../utils/errorManagment';

export default function ListasAlumnos() {
  const nivel = nivelState((state) => state.nivel) as Nivel;
  const { setSearchParams, grado, seccion } = useGradoSeccionSearchParams();
  const { data, isFetching, error, refetch } = useQuery({
    queryKey: ['alumnos', nivel, grado, seccion],
    queryFn: fetchLista,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    enabled: false,
    retry: false,
  });
  useCustomEvent('customSelect', selectListener);
  useEffect(() => {
    if (!error) return;
    ErrorHandler(error);
  }, []);
  return (
    <Container $width="100%" $direction="column" $padding="2rem" $gap="2rem">
      {isFetching && <Loader />}
      <Container $direction="row" $gap="1rem" $width="max-content">
        <Select label="grado" name="grado" width="15rem" options={GRADOS_SELECT_OPTIONS(nivel)} />
        <Select label="seccion" name="seccion" width="10rem" options={SECCION_SELECT_OPTIONS()} />
        <Button $width="max-content" $primary onClick={() => refetch()} disabled={isFetching}>
          Buscar
        </Button>
      </Container>
      <Container>{data && <AlumnosTablePsicologia data={data}></AlumnosTablePsicologia>}</Container>
    </Container>
  );
  async function fetchLista() {
    if (!grado || !seccion) throw new Error('DEBES SELECCIONAR GRADO Y SECCION');
    const response = await Alumno.fetchByGradoSeccion({ grado, seccion });
    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message);
    return response.data.payload;
  }
  function selectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    setSearchParams((old) => {
      old.set(name, value);
      return old;
    });
  }
}
