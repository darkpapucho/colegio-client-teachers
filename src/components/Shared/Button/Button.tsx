import styled, { css } from 'styled-components';

export const Button = styled.button<{
  $primary?: boolean;
  $secondary?: boolean;
  $danger?: boolean;
  $small?: boolean;
  $large?: boolean;
  $width: string;
}>`
  width: ${({ $width }) => $width};
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  transition: all 0.2s ease;
  color: white;
  font-size: 1.4rem;
  border: 1px solid ${({ theme }) => theme.colors.tertiary.dark};
  background-color: ${({ theme }) => theme.colors.tertiary.normal};
  box-shadow: 0px 0px 2px black;
  transition: all 0.3s ease;
  user-select: none;
  &:hover {
    filter: brightness(110%);
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.tertiary.light};
    cursor: pointer;
  }
  &:disabled {
    background-color: ${({ theme }) => theme.colors.tertiary.dark};
    filter: tertiaryscale(60%);
    cursor: not-allowed;
  }
  &:active {
    &:not(:disabled) {
      scale: 1.05;
      background-color: ${({ theme }) => theme.colors.tertiary.normal};
    }
  }
  ${({ $small }) =>
    $small &&
    css`
      padding: 0.5rem;
      font-size: 1.2rem;
    `}
  ${({ $large }) =>
    $large &&
    css`
      padding: 1rem;
      font-size: 1.6rem;
    `}
  ${({ $primary }) =>
    $primary &&
    css`
      background-color: ${({ theme }) => theme.colors.primary.normal};
      border-color: ${({ theme }) => theme.colors.primary.dark};
      &:hover {
        background-color: ${({ theme }) => theme.colors.primary.light};
        cursor: pointer;
      }
      &:disabled {
        background-color: ${({ theme }) => theme.colors.primary.dark};
        filter: tertiaryscale(60%);
        cursor: not-allowed;
      }
      &:active {
        &:not(:disabled) {
          scale: 1.05;
          background-color: ${({ theme }) => theme.colors.primary.normal};
        }
      }
    `}
  ${({ $secondary }) =>
    $secondary &&
    css`
      background-color: ${({ theme }) => theme.colors.secondary.normal};
      border-color: ${({ theme }) => theme.colors.secondary.dark};
      &:hover {
        background-color: ${({ theme }) => theme.colors.secondary.light};
        cursor: pointer;
      }
      &:disabled {
        background-color: ${({ theme }) => theme.colors.secondary.dark};
        filter: tertiaryscale(60%);
        cursor: not-allowed;
      }
      &:active {
        &:not(:disabled) {
          scale: 1.05;
          background-color: ${({ theme }) => theme.colors.secondary.normal};
        }
      }
    `}
    ${({ $danger, theme }) =>
    $danger &&
    css`
      background-color: ${theme.colors.red.normal};
      border-color: ${theme.colors.red.dark};
      &:hover {
        background-color: ${theme.colors.red.light};
        cursor: pointer;
      }
      &:disabled {
        background-color: ${theme.colors.red.dark};
        filter: tertiaryscale(60%);
        cursor: not-allowed;
      }
      &:active {
        &:not(:disabled) {
          scale: 1.05;
          background-color: ${theme.colors.red.normal};
        }
      }
    `};
`;
