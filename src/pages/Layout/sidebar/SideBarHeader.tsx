import styled from 'styled-components';
import logo from '/logo.png';
import { COLEGIO_NAME } from '../../../var/colegioData';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../config/zustand/user';
const StyledSideBarHeader = styled.header`
  margin: 2rem 0 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  .nombre-colegio {
    font-size: ${({ theme }) => theme.fontSizes.headers.small};
    text-align: center;
  }
  .intranet {
    font-size: ${({ theme }) => theme.fontSizes.headers.small};
    margin-top: -1rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.secondary.normal};
  }
  .image {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  img {
    width: 60px;
  }
`;

export default function SideBarHeader() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();
  return (
    <StyledSideBarHeader onClick={() => handleClick()}>
      <span className="image">
        <img src={logo} alt="colegio-logo"></img>
      </span>
      <span className="nombre-colegio">{COLEGIO_NAME}</span>
      <span className="intranet">INTRANET</span>
    </StyledSideBarHeader>
  );
  function handleClick() {
    if (user?.rol == 'profesor') {
      return navigate('/menu/pedagogia');
    }
    if (user?.rol == 'psicologo') {
      return navigate('/menu/psicologia');
    }
    logout();
  }
}
