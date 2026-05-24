import styled from 'styled-components';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { screenBreakingPoint } from '../../config/styled/styled';
import { MenuItem } from './sidebar/SideBarItem';

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
export default function Layout({ menuItems }: { menuItems: MenuItem[] }) {
  return (
    <LayoutContainer>
      <Header></Header>
      <SideBar menuItems={menuItems} />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </LayoutContainer>
  );
}
