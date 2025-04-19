import styled from 'styled-components';

export const TextArea = styled.textarea<{ $width?: string; $padding?: string; $border?: string }>`
  width: ${({ $width }) => $width || '100%'};
  padding: ${({ $padding }) => $padding || 0};
  box-sizing: border-box;
  border: ${({ $border }) => $border || '1px solid black'};
  font-size: 16px;
  resize: none;
`;
