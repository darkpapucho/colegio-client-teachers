import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const DropDownMenuContainer = styled.div`
  position: absolute;
  right: 0;
  top: 4rem;
  display: flex;
  flex-direction: column;
  width: 24rem;
  clip-path: polygon(0% 10%, 85% 10%, 90% 0%, 95% 10%, 100% 10%, 100% 100%, 0% 100%);
`;
const DropDownMenuItem = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.secondary.light};
  font-size: 1.8rem;
  padding: 4px 1rem;
  color: white;
  cursor: pointer;
  &:first-child {
    padding-top: 8px;
  }
  &:not(:last-child) {
    border-bottom: 1px solid black;
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.normal};
    color: white;
  }
`;
export default function DropDownMenu({ handler }: { handler: () => void }) {
  const navigate = useNavigate();

  return (
    <DropDownMenuContainer>
      <DropDownMenuItem>Datos</DropDownMenuItem>
      <DropDownMenuItem onClick={() => handleClick('/menu/cambiar-password')}>Cambiar contraseña</DropDownMenuItem>
    </DropDownMenuContainer>
  );
  function handleClick(route: string) {
    handler();
    navigate(route);
  }
}
