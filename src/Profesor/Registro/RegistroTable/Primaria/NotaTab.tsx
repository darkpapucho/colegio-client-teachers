import styled from 'styled-components';
import { Container } from '../../../../components/Shared/Container/Container';
import { Periodo } from '../../../../types/gradoSalon';
import { convertNumberToLetra, getColorsByNota } from './utils';
import NotaCell from './NotaCell';

const NotaText = styled.p<{ $color: string }>`
  width: 100%;
  text-align: center;
  color: ${({ $color }) => $color};
  user-select: none;
`;

export default function NotaTab({
  initValue,
  cursoKey,
  alumnoId,
  periodo,
}: {
  initValue: number;

  cursoKey: string;
  alumnoId: string;
  periodo: Periodo;
}) {
  const { bgColor } = getColorsByNota(initValue);

  return (
    <Container $width="100%" $alignItems="center" $direction="row" $height="30px">
      <NotaCell width="50%" type="curso" field={cursoKey} alumnoId={alumnoId} periodo={periodo} initValue={initValue} />
      <Container $width="50%" $justifyContent="center" $alignItems="center" $border="1px solid #cacaca" $bgColor={'#f8f8f8'} $height="30px">
        <NotaText $color={bgColor}>{convertNumberToLetra(initValue)}</NotaText>
      </Container>
    </Container>
  );
}
