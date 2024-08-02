import styled from 'styled-components';
import { COLEGIO_DIRECCION, COLEGIO_EMAIL, COLEGIO_TELEFONO } from '../../var/colegioData';
import { CiMail } from 'react-icons/ci';
import logo from '/logo.png';
import { FaWhatsapp } from 'react-icons/fa';
import { screenBreakingPoint } from '../../config/styled/styled';
import { TbCurrentLocation } from 'react-icons/tb';
const LoginFootContainer = styled.div`
  padding-inline: 1rem;
  grid-column: 1 / -1;
  grid-row: 3 / 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  gap: 0.5rem;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.secondary.dark};
  padding: 2rem 0;
  @media (min-width: ${screenBreakingPoint}) {
    padding: 3rem 0;
    flex-direction: row;
    align-items: center;
  }
  .school-logo {
    align-self: center;
    width: 60px;
    img {
      width: 100%;
    }
    @media (min-width: ${screenBreakingPoint}) {
      width: 100px;
    }
  }
  .school-info {
    li {
      display: flex;
      gap: 0.5rem;
      color: white;
      list-style: none;
      align-items: center;
      p {
        font-size: ${({ theme }) => theme.fontSizes.text.small};
        @media (min-width: ${screenBreakingPoint}) {
          font-size: ${({ theme }) => theme.fontSizes.text.normal};
        }
      }
      svg {
        font-size: 1.6rem;
        font-weight: 600;
        @media (min-width: ${screenBreakingPoint}) {
          font-size: 2rem;
          font-weight: 800;
        }
      }
      &:nth-child(1) {
        svg {
          color: ${({ theme }) => theme.colors.red.light};
        }
      }
      &:nth-child(2) {
        svg {
          color: ${({ theme }) => theme.colors.tertiary.light};
        }
      }
      &:nth-child(3) {
        svg {
          color: ${({ theme }) => theme.colors.green.light};
        }
      }
    }
  }
`;
export default function LoginFoot() {
  return (
    <LoginFootContainer>
      <ul className="school-info">
        <li>
          <TbCurrentLocation />
          <p>{COLEGIO_DIRECCION}</p>
        </li>
        <li>
          <CiMail />
          <p>{COLEGIO_EMAIL}</p>
        </li>
        <li>
          <FaWhatsapp />
          <p>{COLEGIO_TELEFONO}</p>
        </li>
      </ul>
      <div className="school-logo">
        <img src={logo} alt="colegio-logo"></img>
      </div>
    </LoginFootContainer>
  );
}
