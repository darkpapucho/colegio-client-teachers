import styled from 'styled-components';
import { CiMoneyCheck1 } from 'react-icons/ci';
import { BiCalendarCheck, BiFoodMenu, BiSpreadsheet, BiX } from 'react-icons/bi';
import SideBarMenuItem, { MItem } from './sidebar/SideBarItem';
import SideBarHeader from './sidebar/SideBarHeader';
import { screenBreakingPoint } from '../../config/styled/styled';
import { useRef } from 'react';
import { Icon } from '../../components/Shared/Icon/Icon';
import { PiUserList } from 'react-icons/pi';
const SideBarItems: MItem[] = [
  { label: 'Registro Notas', url: 'registro', icon: <BiSpreadsheet /> },
  { label: 'Pasar Asistencias', url: 'asistencias', icon: <BiCalendarCheck /> },
  { label: 'Registro Asistencias', url: 'lista-asistencia', icon: <PiUserList /> },
  { label: 'Asignaciones', url: '', icon: <BiFoodMenu /> },
  { label: 'Pensiones', url: 'pensiones', icon: <CiMoneyCheck1 /> },
  { label: 'Board', url: 'board', icon: <BiFoodMenu /> },
  { label: 'Generar Libretas', url: 'generar-libretas', icon: <BiFoodMenu /> },
];

const SideBarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100dvh;
  width: 25rem;
  padding: 10px 14px;
  background-color: white;
  display: none;
  min-height: 100dvh;
  box-shadow: 0 0 6px black;
  z-index: 10;
  header {
    position: relative;
  }
  .hide-button {
    position: absolute;
    right: -3.4rem;
    top: 5rem;
    width: 40px;
    height: 40px;
    background-color: ${({ theme }) => theme.colors.red.dark};
    border-radius: 50%;
    color: white;
  }
  .menu-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  @media (width>${screenBreakingPoint}) {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    display: block !important;
    .hide-button {
      display: none;
    }
  }
`;
export default function SideBar() {
  const sideBarRef = useRef<HTMLDivElement | null>(null);

  return (
    <SideBarContainer id="sidebar" ref={sideBarRef}>
      <header>
        <SideBarHeader />
        <Icon $large className="hide-button" $pointer>
          <BiX onClick={() => hideSidebar()} />
        </Icon>
      </header>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-items">
            {SideBarItems.map((item, index) => (
              <SideBarMenuItem item={item} key={index}></SideBarMenuItem>
            ))}
          </ul>
        </div>
      </div>
    </SideBarContainer>
  );
  function hideSidebar() {
    sideBarRef.current!.style.display = 'none';
  }
}
