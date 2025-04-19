import styled, { css } from 'styled-components';

export const Icon = styled.div<{
  $tiny?: boolean;
  $small?: boolean;
  $large?: boolean;
  $primary?: boolean;
  $secondary?: boolean;
  $danger?: boolean;
  $pointer?: boolean;
  $color?: string;
  $width?: string;
  $borderRadius?: string;
  $bgColor?: string;
  $fontSize?: string;
}>`
  display: flex;
  justify-content: center;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $borderRadius }) =>
    $borderRadius &&
    css`
      border-radius: ${$borderRadius};
    `};

  ${({ $pointer }) =>
    $pointer &&
    css`
      cursor: pointer;
      &:hover {
        svg {
          filter: brightness(1.2);
        }
      }
    `};

  font-size: ${({ $small, $large, $tiny, theme }) => {
    if ($small) {
      return theme.fontSizes.headers.small;
    } else if ($large) {
      return theme.fontSizes.headers.large;
    } else if ($tiny) {
      return '12px';
    } else {
      return theme.fontSizes.headers.normal;
    }
  }};

  ${({ $danger, $primary, $secondary, $color, theme }) => {
    if ($danger) {
      return css`
        color: ${theme.colors.red.normal};
      `;
    } else if ($primary) {
      return css`
        color: ${theme.colors.primary.normal};
      `;
    } else if ($secondary) {
      return css`
        color: ${theme.colors.secondary.normal};
      `;
    } else {
      return css`
        color: ${$color};
      `;
    }
  }};

  //width
  width: ${({ $width }) => $width || '100%'};
  ${({ $fontSize }) =>
    $fontSize &&
    css`
      font-size: ${$fontSize};
    `}
  &:hover {
    ${({ $bgColor }) =>
      $bgColor &&
      css`
        background-color: ${$bgColor};
      `}
  }
`;
