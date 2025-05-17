import Modal from '../../../components/Shared/Modal/Modal';
import { Periodo } from '../../../types/gradoSalon';
import ConclusionesDescriptivasModalForm from './ConclusionesDescriptivasModalForm';

export default function EditConClusionesDescriptivasModal({
  saveHandler,
  onCloseModal,
  data,
}: {
  saveHandler: (value: string) => void;
  onCloseModal: () => void;
  data: { periodo: Periodo; alumnoId: string; data: string; nombres: string; apellidos: string } | null;
}) {
  if (!data) {
    return null;
  }
  return (
    <Modal width="500px" onCloseModal={onCloseModal} title={`Editando: ${data.apellidos}, ${data.nombres}`}>
      <ConclusionesDescriptivasModalForm conclusionesDescriptivasModalData={data!} saveHandler={saveHandler} onClose={onCloseModal} />
    </Modal>
  );
}
