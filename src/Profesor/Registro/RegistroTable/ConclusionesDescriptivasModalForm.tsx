import { useRef } from 'react';
import { Button } from '../../../components/Shared/Button/Button';
import { Container } from '../../../components/Shared/Container/Container';
import { TextArea } from '../../../components/Shared/TextArea/TextArea';

import { Periodo } from '../../../types/gradoSalon';
type CDModalData = { periodo: Periodo; alumnoId: string; data: string; nombres: string; apellidos: string };
export default function ConclusionesDescriptivasModalForm({
  conclusionesDescriptivasModalData,
  saveHandler,
  onClose,
}: {
  onClose: () => void;
  conclusionesDescriptivasModalData: CDModalData;
  saveHandler: (value: string) => void;
}) {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <Container $direction="column" $width="100%" $gap="2rem">
      <TextArea defaultValue={conclusionesDescriptivasModalData!.data} rows={5} $padding="6px" ref={textAreaRef}></TextArea>
      <Container $justifyContent="space-between">
        <Button $width="max-content" $primary onClick={() => saveHandler(textAreaRef.current!.value.trim())}>
          Guardar
        </Button>
        <Button $width="max-content" $danger onClick={() => onClose()}>
          Cancelar
        </Button>
      </Container>
    </Container>
  );
}
