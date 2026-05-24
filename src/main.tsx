import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './config/styled/styled.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './config/reactQuery/reactQuery.ts';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Toaster></Toaster>
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
