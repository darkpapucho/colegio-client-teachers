import { useSearchParams } from 'react-router-dom';
import { Container } from '../../../components/Shared/Container/Container';
import { useLayoutEffect } from 'react';
import ErrorHandler from '../../../utils/errorManagment';
import Alumno from '../../../models/Alumno/Alumno';
import { updateToken } from '../../../utils/axiosUtils';

export default function AlumnoInfo() {
  const [searchParams] = useSearchParams();

  const alumnoId = searchParams.get('id');
  console.log({ alumnoId });
  useLayoutEffect(() => {
    fetchAlumnoInfo();
  }, []);
  return <Container>Alumno info page this is it!</Container>;
  async function fetchAlumnoInfo() {
    try {
      const response = await Alumno.fetchAlumnoInfo({ alumnoId: alumnoId as string });
      updateToken(response);
    } catch (err) {
      ErrorHandler(err);
    }
  }
}
