import { Container } from '../../components/Shared/Container/Container';
import { Text } from '../../components/Shared/Text/Text';
import SalonesFilter from '../SalonesFilter.tsx/SalonesFilter';
import useAuth from '../../config/zustand/user';
import { Teacher } from '../../config/zustand/types/teacher';
import { Button } from '../../components/Shared/Button/Button';
import { createContext } from 'react';
import AlumnosList from './AlumnosList';
import ApoderadosModal from './EditarApoderadoModal/ApoderadosModal';
import { AMatriculado } from '../../types/alumno';
import useListaAlumnos from '../../hooks/useListaAlumnos';

type MisSalonesContextProps = {
  setSelectedAlumno: (alumno: AMatriculado | null) => void;
};
export const MisSalonesContext = createContext<MisSalonesContextProps | null>(null);

export default function MisSalones() {
  const user = useAuth().user as unknown as Teacher;
  const { isFetching, alumnos: data, selectedAlumno, setSelectedAlumno, refetch } = useListaAlumnos();
  return (
    <Container $direction="column" $gap="2rem">
      <MisSalonesContext.Provider value={{ setSelectedAlumno }}>
        {selectedAlumno && (
          <ApoderadosModal selectedAlumno={selectedAlumno} onCloseModal={() => setSelectedAlumno(null)} />
        )}
        {isFetching && <Text>Cargando alumnos...</Text>}
        <Text $fontSize="2.4rem" $fontWeight="bold">
          Mis Salones
        </Text>
        <Container $direction="row" $gap="1rem">
          <SalonesFilter salones={user.salones} />
          <Button $primary onClick={() => refetch()} $width="max-content" disabled={isFetching}>
            VER LISTA
          </Button>
        </Container>
        {data && <AlumnosList alumnos={data} />}
      </MisSalonesContext.Provider>
    </Container>
  );
}
