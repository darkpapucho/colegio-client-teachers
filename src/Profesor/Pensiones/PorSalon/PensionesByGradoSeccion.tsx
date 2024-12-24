import { createContext, useState } from 'react';
import { Button } from '../../../components/Shared/Button/Button';
import { Container } from '../../../components/Shared/Container/Container';
import Loader from '../../../components/Shared/Loader/Loader';
import Select from '../../../components/Shared/Select/Select';
import useGradoSeccionSearchParams from '../../../hooks/useGradoSeccionSearchParams';
import { Nivel } from '../../../types/gradoSalon';
import { updateToken } from '../../../utils/axiosUtils';
import PensionesGradoSeccionTable from './components/PensionesGradoSeccionTable';
import { nivelState } from '../../../config/zustand/nivel';
import { AMatriculado } from '../../../types/alumno';
import ErrorHandler from '../../../utils/errorManagment';
import Pensiones from '../../../models/Pensiones/Pension';
import { useProfesor } from '../../../hooks/useProfesor';
import { generateGrados, generateSecciones } from '../../../utils/profesor';

export const PensionesByGradoSeccionContext = createContext<{
  setData: React.Dispatch<
    React.SetStateAction<
      {
        alumnoId: string;
        numPensionesPagadas: number;
        pensiones: Pension[];
        estudiante: AMatriculado;
      }[]
    >
  >;
} | null>(null);

export default function PensionesByGradoSeccion() {
  const nivel = nivelState((state) => state.nivel) as Nivel;
  const profesor = useProfesor((state) => state.profesor);
  // const salones = profesor!.salones;

  const salonesList = profesor?.salones.filter((salon) => {
    return salon.tutor;
  });
  const { grado, seccion } = useGradoSeccionSearchParams();
  const [data, setData] = useState<{ alumnoId: string; numPensionesPagadas: number; pensiones: Pension[]; estudiante: AMatriculado }[]>([]);

  const [loading, setLoading] = useState(false);
  if (!salonesList || salonesList.length === 0) {
    return <>Usted no es tutor de ningun salón</>;
  }
  return (
    <PensionesByGradoSeccionContext.Provider value={{ setData }}>
      {loading && <Loader />}
      <Container $direction="column" $padding="0 0 3rem 0" $width="100%" $gap="1.5rem">
        <Container $direction="row" $width="max-content" $gap=".5rem">
          <Select options={generateGrados(salonesList)} label="grado" name="grado" width={`${nivel === 'inicial' ? '12rem' : '9rem'}`}></Select>
          {grado && <Select key={grado} options={generateSecciones(grado, salonesList)} width="9rem" name="seccion" label="sección" />}{' '}
          <Button $primary $width="max-content" onClick={fetchList}>
            Buscar
          </Button>
        </Container>
        {data && data.length > 0 && <PensionesGradoSeccionTable data={data} />}
      </Container>
    </PensionesByGradoSeccionContext.Provider>
  );

  async function fetchList() {
    try {
      setLoading(true);
      // const estadosMatricula = searchParams.get('estadosMatricula')?.split('-') as EstadoMatricula[];
      if (!grado || !seccion) throw new Error('grado o sección inválido');
      const response = await Pensiones.fetchListByGradoSeccion({ grado, seccion, estadosMatricula: ['DEFINITIVA', 'EN PROCESO'] });

      updateToken(response);
      if (!response.data.ok) {
        throw new Error(response.data.message);
      }
      setData(response.data.payload);
    } catch (err) {
      ErrorHandler(err);
    } finally {
      setLoading(false);
    }
  }
}
