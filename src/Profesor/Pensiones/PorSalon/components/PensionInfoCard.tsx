import styled, { css } from 'styled-components';

import { Container } from '../../../../components/Shared/Container/Container';
import { getDisplayPensionCardBgColor, getDisplayPensionCardContent } from './utils';

const DisplayPensionContainer = styled(Container)<{ $index: boolean }>`
  font-weight: bolder;
  padding: 0.5rem;
  ${({ $index }) =>
    $index &&
    css`
      filter: brightness(110%) hue-rotate(12deg);
    `}
`;

export default function PensionInfoCard({ pension, $index }: { $index: boolean; pension: Pension | undefined }) {
  const mesActual = new Date().getMonth();
  return (
    <DisplayPensionContainer $index={$index} $width="100%" $bgColor={getDisplayPensionCardBgColor(pension, mesActual)} $justifyContent="center">
      {getDisplayPensionCardContent(pension, mesActual)}
    </DisplayPensionContainer>
  );
}
