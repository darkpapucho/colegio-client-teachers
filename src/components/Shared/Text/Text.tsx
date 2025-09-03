import styled, { css } from 'styled-components';

export const Text = styled.p<{
  $small?: boolean;
  $normal?: boolean;
  $large?: boolean;
  $danger?: boolean;
  $primary?: boolean;
  $secondary?: boolean;
  $color?: string;
  $textAlign?: string;
  $width?: string;
  $fontWeight?: string;
  $fontSize?: string;
}>`
  //fontweigth
  ${({ $fontWeight }) =>
    $fontWeight &&
    css`
      font-weight: ${$fontWeight};
    `}
  //width
  ${({ $width }) =>
    $width &&
    css`
      width: ${$width};
    `}
  //textAlign
  ${({ $textAlign }) =>
    $textAlign &&
    css`
      text-align: ${$textAlign};
    `}
  font-size: ${({ $small, $large, theme }) => {
    if ($small) {
      return theme.fontSizes.text.small;
    } else if ($large) {
      return theme.fontSizes.text.large;
    } else {
      return theme.fontSizes.text.normal;
    }
  }};

  color: ${(props) => {
    if (props.$danger) {
      return props.theme.colors.red.normal;
    } else if (props.$primary) {
      return props.theme.colors.primary.normal;
    } else if (props.$secondary) {
      return props.theme.colors.secondary.normal;
    }
    //else {
    //   return props.theme.colors.tertiary.normal;
    // }
  }};
  ${({ $color }) =>
    $color &&
    css`
      color: ${$color};
    `}
  ${({ $fontSize }) =>
    $fontSize &&
    css`
      font-size: ${$fontSize};
    `}
`;
