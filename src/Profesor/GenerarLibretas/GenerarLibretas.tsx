import { useState } from 'react';
import { Button } from '../../components/Shared/Button/Button';
import { Container } from '../../components/Shared/Container/Container';
import { Text } from '../../components/Shared/Text/Text';
import { nivelState } from '../../config/zustand/nivel';
import { useProfesor } from '../../hooks/useProfesor';
import SalonesFilter from '../SalonesFilter.tsx/SalonesFilter';
import Loader from '../../components/Shared/Loader/Loader';
import Notas from '../../models/Notas/Notas';
import { useSearchParams } from 'react-router-dom';
import { Grado, Seccion } from '../../types/gradoSalon';
import ErrorHandler from '../../utils/errorManagment';
import { updateToken } from '../../utils/axiosUtils';

export default function GenerarLibretas() {
  const profesor = useProfesor((state) => state.profesor)!;
  const salones = profesor.salones;
  const nivel = nivelState((state) => state.nivel)!;
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  return (
    <>
      {loading && <Loader />}
      <Container $direction="column" $width="100%" $gap="1rem">
        <Text $fontSize="24px" $color="red" $fontWeight="400">
          Solo se generarán las libretas de aquellos alumnos que se encuentran al día en las pensiones.
        </Text>
        <SalonesFilter salones={salones} />
        <Button onClick={() => DescargarLibretas()} $width="max-content" $primary>
          Descargar Libretas
        </Button>
      </Container>
    </>
  );
  async function DescargarLibretas() {
    try {
      const grado = searchParams.get('grado') as Grado | undefined;
      const seccion = searchParams.get('seccion') as Seccion | undefined;
      console.log({ nivel, grado, seccion });
      if (!grado || !seccion) throw new Error('Grado o seccion inválidos');
      setLoading(true);
      const response = await Notas.generateLibretaNotas({ grado, seccion, nivel });

      updateToken(response);

      const myBlob = new Blob([response.data]);

      const fileURL = URL.createObjectURL(myBlob);
      const alink = document.createElement('a');
      alink.href = fileURL;
      alink.download = `Libretas-${grado}-${seccion}.zip`;
      alink.click();
      alink.remove();
      setLoading(false);
    } catch (err) {
      ErrorHandler(err);
      setLoading(false);
    }
  }
}
