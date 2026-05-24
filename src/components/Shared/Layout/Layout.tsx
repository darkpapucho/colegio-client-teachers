import styled from 'styled-components';
import { screenBreakingPoint } from '../../../config/styled/styled';

const LayoutContainer = styled.div`
  display: grid;
  min-height: 100dvh;
  min-width: 100dvw;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  @media (width>${screenBreakingPoint}) {
    grid-template-columns: 25rem 1fr;
  }
`;
const MainContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  background-color: tertiary;
  background-color: white;
  @media (width>${screenBreakingPoint}) {
    grid-column: 2 / 3;
    padding: 2rem;
  }
`;

export { MainContainer, LayoutContainer };
