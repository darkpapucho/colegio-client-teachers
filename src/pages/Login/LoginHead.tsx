import styled from 'styled-components';
import { COLEGIO_NAME } from '../../var/colegioData';
import { screenBreakingPoint } from '../../config/styled/styled';

export const LoginHeadContainer = styled.header`
  grid-column: 1 / -1;
  grid-row: 1 / 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: 1rem;
  background-color: ${({ theme }) => theme.colors.secondary.dark};
  padding: 2rem 0;
  h1 {
    color: white;
    text-align: center;
    text-wrap: balance;
  }
  @media (width>${screenBreakingPoint}) {
    padding: 3rem 0;
  }
`;

export default function LoginHead() {
  return (
    <LoginHeadContainer>
      <h1>{COLEGIO_NAME} </h1>
    </LoginHeadContainer>
  );
}
