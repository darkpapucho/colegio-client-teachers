import 'styled-components';
import { CssColor } from './config/styled/types';
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      yellow: {
        light: string;
        normal: string;
        dark: string;
      };
      green: {
        light: string;
        normal: string;
        dark: string;
      };
      primary: {
        light: CssColor;
        normal: CssColor;
        dark: CssColor;
      };
      secondary: {
        light: CssColor;
        normal: CssColor;
        dark: CssColor;
      };
      tertiary: {
        light: CssColor;
        normal: CssColor;
        dark: CssColor;
      };
      red: {
        light: CssColor;
        normal: CssColor;
        dark: CssColor;
      };
    };
    fontSizes: {
      text: {
        small: string;
        normal: string;
        large: string;
      };
      headers: {
        small: string;
        normal: string;
        large: string;
        extraLarge: string;
      };
    };
    paddings: {
      small: string;
      normal: string;
      large: string;
    };
  }
}
