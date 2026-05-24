import styled from 'styled-components';
import { Button } from '../../components/Shared/Button/Button';
import Input from '../../components/Shared/Input/Input';
import { theme } from '../../config/styled/styled';
import { Link, Navigate } from 'react-router-dom';
import { FormEvent } from 'react';
import { FaLock, FaUser } from 'react-icons/fa';
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
import useAuth, { User } from '../../config/zustand/user';
import Loader from '../../components/Shared/Loader/Loader';

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
  const { user, isLoading, login, setIsLoading, logout } = useAuth();
  const setToken = tokenState((state) => state.setToken);
  const setNivel = nivelState((state) => state.setNivel);

  const nivel = nivelState((state) => state.nivel);
  const year = yearState((state) => state.year);

  useCustomEvent('customSelect', listener);
  function listener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'nivel') {
      setNivel(value);
    }
  }

  if (user !== undefined) {
    if (user.rol == 'profesor') {
      return <Navigate to={'/menu/pedagogia'} />;
    }
    if (user.rol == 'psicologo') {
      return <Navigate to="/menu/psicologia" />;
    }
    logout();
  }
  return (
    <LoginFormContainer>
      {isLoading && <Loader />}
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
      setIsLoading(true);
      const response = await axios.post<AxiosResponseSchema<{ user: User; token: string }>>(url, {
        year,
        nivel,
        username,
        password,
      });

      const { ok } = response.data;
      if (!ok) throw new Error(response.data.message);
      const { payload } = response.data;
      if (payload.user == undefined) throw new Error('INVALID CREDENTIALS');
      login(payload.user);
      setToken(response.data.payload.token);
    } catch (error) {
      ErrorHandler(error);
    } finally {
      setIsLoading(false);
    }
  }
}
