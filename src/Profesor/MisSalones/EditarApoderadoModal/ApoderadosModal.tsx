import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { Button } from '../../../components/Shared/Button/Button';
import { Container } from '../../../components/Shared/Container/Container';
import { AMatriculado } from '../../../types/alumno';
import AgregarApoderadoCard from './AgregarApoderadoCard';
import Modal from '../../../components/Shared/Modal/Modal';
import { formatNombreCompletoForList } from '../../../utils/format';
import EditarApoderadoCard from './EditarApoderadoCard';

export default function ApoderadosModal({
  selectedAlumno,
  onCloseModal,
}: {
  selectedAlumno: AMatriculado;
  onCloseModal: () => void;
}) {
  const [showAgregarApoderadoCard, setShowAgregarApoderadoCard] = useState(false);
  return (
    <Modal
      title={`Apoderados de ${formatNombreCompletoForList(selectedAlumno.nombreCompleto)}`}
      onCloseModal={onCloseModal}
      width="60rem">
      <Container $width="100%" $gap="1rem" $direction="column">
        {(!selectedAlumno.apoderados || selectedAlumno.apoderados.length < 2) && !showAgregarApoderadoCard && (
          <Button $width="100%" $color="#40af30" onClick={() => setShowAgregarApoderadoCard(true)}>
            AGREGAR APODERADO <MdAdd fontSize={'2rem'} fontWeight={'bold'} color="#430460" />
          </Button>
        )}
        {showAgregarApoderadoCard && <AgregarApoderadoCard alumnoId={selectedAlumno._id} />}
        {selectedAlumno.apoderados && selectedAlumno.apoderados.length > 0 && (
          <Container $width="100%" $direction="column" key={selectedAlumno._id} $gap="1rem">
            {selectedAlumno.apoderados.map((apoderado) => {
              return <EditarApoderadoCard apoderado={apoderado} key={apoderado._id} alumnoId={selectedAlumno._id} />;
            })}
          </Container>
        )}
      </Container>
    </Modal>
  );
}
