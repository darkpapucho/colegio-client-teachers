import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { Icon } from '../../../components/Shared/Icon/Icon';
import { Periodo } from '../../../types/gradoSalon';
import { useContext } from 'react';
import { RegistroContext } from './Inicial/RegistroTableInicial';

export default function ConclusionesDescriptivasUI({
  alumnoId,
  periodo,
  data,
  nombres,
  apellidos,
}: {
  nombres: string;
  apellidos: string;
  alumnoId: string;
  periodo: Periodo;
  data: string;
}) {
  const { setConclusionesDescriptivasModalData, setShowModal } = useContext(RegistroContext)!;
  const length = data.length;
  return (
    <>
      {length > 0 ? (
        <Icon $color="green" $pointer $fontSize="1.7rem" onClick={() => onClick()}>
          <BiCheckCircle />
        </Icon>
      ) : (
        <Icon $color="red" $pointer $fontSize="1.7rem" onClick={() => onClick()}>
          <BiXCircle />
        </Icon>
      )}
    </>
  );
  function onClick() {
    setConclusionesDescriptivasModalData({ alumnoId, periodo, data, nombres, apellidos });
    setShowModal(true);
  }
}
