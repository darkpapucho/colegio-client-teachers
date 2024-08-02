import styled, { css } from 'styled-components';
import { Container } from '../Container/Container';

export const StyledTable = styled(Container)`
  width: max-content !important;
  display: flex;
  flex-direction: column;
`;

export const StyledTableHeader = styled.div<{ $gridTemplateColumns: string }>`
  display: grid;
  grid-template-columns: ${({ $gridTemplateColumns }) => $gridTemplateColumns};
  border: 1px solid black;
`;

export const StyledTableBody = styled.div<{ $gridTemplateColumns: string }>`
  display: grid;
  border: 1px solid black;
  grid-template-columns: ${({ $gridTemplateColumns }) => $gridTemplateColumns};
`;

const StyledTableItem = styled(Container)<{
  $padding?: string;
  $fontSize?: string;
  $color?: string;
}>`
  ${({ $fontSize }) =>
    $fontSize &&
    css`
      font-size: ${$fontSize};
    `}
  ${({ $color }) =>
    $color &&
    css`
      color: ${$color};
    `}
    ${({ $padding }) =>
    $padding &&
    css`
      padding: ${$padding};
    `}
`;

export const StyledTableHeaderItem = styled.div<{
  $bgColor?: string;
  $padding?: string;
}>`
  color: white;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, $bgColor }) => $bgColor || theme.colors.secondary.normal};
  padding: ${({ $padding }) => $padding || '0'};
  &:not(:last-child) {
    border-right: 1px solid black;
  }
`;

export const StyledTableBodyItem = styled(StyledTableItem)`
  background-color: ${({ theme, $bgColor }) => $bgColor || theme.colors.tertiary.light};
  font-weight: 300;
  padding: ${({ $padding }) => $padding || '0'};
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  /* height: 30px; */
`;
