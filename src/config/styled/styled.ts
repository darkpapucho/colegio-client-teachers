import { DefaultTheme, createGlobalStyle } from 'styled-components';

export const screenBreakingPoint = '600px';

export const theme: DefaultTheme = {
  colors: {
    yellow: {
      light: 'hsla(55, 100%, 60%,1)',
      normal: 'hsla(55, 100%, 47%,1)',
      dark: 'hsla(55, 100%, 40%,1)',
    },
    green: {
      light: 'hsla(143, 66%, 53%,1)',
      normal: '#32b448',
      dark: 'hsla(143, 66%, 30%,1)',
    },
    secondary: {
      light: 'hsl(228, 100%, 65%,1)',
      normal: 'hsl(228, 100%, 60%,1)',
      dark: 'hsl(228, 80%, 35%,1)',
    },
    primary: {
      light: 'hsl(35, 100%, 60%,1)',
      normal: 'hsl(35, 100%, 51%,1)',
      dark: 'hsl(35, 100%, 42%,1)',
    },
    tertiary: {
      light: 'hsl(0, 0%, 85%,1)',
      normal: 'hsl(0, 0%, 40%,1)',
      dark: 'hsl(0, 0%, 15%,1)',
    },
    red: {
      light: '#ed7c54',
      normal: 'hsl(0, 70%, 58%,1)',
      dark: 'hsl(0, 100%, 45%,1)',
    },
  },
  fontSizes: {
    text: {
      small: '1.2rem',
      normal: '1.4rem',
      large: '1.8rem',
    },
    headers: {
      small: '2.4rem',
      normal: '3rem',
      large: '3.6rem',
      extraLarge: '4rem',
    },
  },
  paddings: {
    small: '3px',
    normal: '5px',
    large: '8px',
  },
};

export const GlobalStyle = createGlobalStyle`
  :root{
    color-scheme: light dark;
  }
  *,*::after,*::before{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html{
    font-size: 62.5%;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 300;
    color: ${theme.colors.tertiary.dark};
  }
  body{
    box-sizing: inherit;
    font-size: ${theme.fontSizes.text.normal};
    font-family: inherit;
    color: inherit;
    @media(min-width:${screenBreakingPoint}){
      font-size: ${theme.fontSizes.text.small};
    }
  }
  a,a:visited,a:active{
    text-decoration: none;
    color:${theme.colors.tertiary.dark}
  }
  h1{
    font-size: ${theme.fontSizes.headers.large};
    font-weight: 700;
    line-height: 1.05;
    @media (min-width:${screenBreakingPoint}) {
      font-size: ${theme.fontSizes.headers.extraLarge};
    }
  }
  h2{
    font-size: ${theme.fontSizes.headers.normal};
    line-height: 1.05;
    font-weight:600;
    @media (min-width: ${screenBreakingPoint}) {
      font-size: ${theme.fontSizes.headers.large};
    }
  }
  h3{
    font-size: ${theme.fontSizes.headers.small};
    line-height: 1.05;
    font-weight: 500;
    @media (min-width: ${screenBreakingPoint}){
      font-size: ${theme.fontSizes.headers.normal};
    }
  }
  .hidden{
    display: none;
  }
  .border-bottom{
    border-bottom: 1px solid black;
  }
  .border-right{
    border-right: 1px solid black;
  }
`;
