import styled from 'styled-components';
import { BiX } from 'react-icons/bi';
import SideBarMenuItem, { MenuItem } from './sidebar/SideBarItem';
import SideBarHeader from './sidebar/SideBarHeader';
import { screenBreakingPoint } from '../../config/styled/styled';
import { useRef } from 'react';
import { Icon } from '../../components/Shared/Icon/Icon';

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

export default function SideBar({ menuItems }: { menuItems: MenuItem[] }) {
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
            {menuItems.map((item, index) => (
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
