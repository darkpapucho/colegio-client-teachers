import styled from 'styled-components';
import { Button } from '../../components/Shared/Button/Button';
import Input from '../../components/Shared/Input/Input';
import { theme } from '../../config/styled/styled';
import { Link, Navigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
import { Profesor, useProfesor } from '../../hooks/useProfesor';
import axios from 'axios';
import Select from '../../components/Shared/Select/Select';
import useCustomEvent from '../../hooks/useCustomEvent';
import { AxiosResponseSchema } from '../../config/axios/axios';
import { NivelesSelect, nivelState } from '../../config/zustand/nivel';
import { yearState } from '../../config/zustand/year';
import { tokenState } from '../../config/zustand/token';
import ErrorHandler from '../../utils/errorManagment';
import { Container } from '../../components/Shared/Container/Container';
import { API_END_POINTS } from '../../config/axios/endPoints';
import { API_URL } from '../../var/envData';

const LoginFormContainer = styled.div`
  grid-column: 2 / -2;
  grid-row: 2 / 3;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 600px;
  color: black;
  /* transform: translateY(-10%); */
  form {
    a {
      align-self: flex-end;
      color: ${({ theme }) => theme.colors.primary.light};
      text-align: right;
      margin-bottom: 3rem;
    }
    h2 {
      text-align: center;
      margin-bottom: 2rem;
    }
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 4rem;
    background-color: ${theme.colors.secondary.light};
    .form-button {
      align-self: center;
    }
  }
`;

export default function LoginForm() {
  const profesor = useProfesor((state) => state.profesor);
  const setToken = tokenState((state) => state.setToken);
  const setNivel = nivelState((state) => state.setNivel);
  //const resetNivel = nivelState((state) => state.resetNivel);
  const nivel = nivelState((state) => state.nivel);
  const year = yearState((state) => state.year);
  const setProfesor = useProfesor((state) => state.setProfesor);

  useCustomEvent('customSelect', listener);
  function listener(event: CustomEvent) {
    const { name, value } = event.detail;

    if (name === 'nivel') {
      setNivel(value);
    }
  }
  if (profesor !== null) {
    return <Navigate to={'/menu'} />;
  }
  return (
    <LoginFormContainer>
      <form onSubmit={onSubmit}>
        <h2>Login</h2>
        <Input width="100%" type="text" vertical name="username" label="Usuario" icon={<FaUser />}></Input>
        <Input width="100%" type="password" vertical name="password" label="Password" icon={<FaLock />}></Input>
        <Container $width="100%" $justifyContent="flex-end">
          <Select width="12rem" label="nivel" name="nivel" options={NivelesSelect}></Select>
        </Container>
        <Link to={'/'}>¿Olvidaste tu contraseña?</Link>

        <Button $width="85%" $primary className="form-button">
          Login
        </Button>
      </form>
    </LoginFormContainer>
  );

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const username = document.querySelector<HTMLInputElement>('#username')!.value;
    const password = document.querySelector<HTMLInputElement>('#password')!.value;
    const url = API_URL + API_END_POINTS.loginProfesor;

    try {
      const response = await axios.post<AxiosResponseSchema<{ profesor: Profesor; token: string }>>(url, {
        year,
        nivel,
        username,
        password,
      });

      if (response.data.ok) {
        setProfesor(response.data.payload.profesor);
        setToken(response.data.payload.token);
      } else {
        // resetNivel();
        throw new Error(response.data.message);
      }
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
