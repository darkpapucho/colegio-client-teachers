import { useRef, useState } from 'react';
import { Container } from '../../components/Shared/Container/Container';
import Input from '../../components/Shared/Input/Input';
import { useProfesor } from '../../hooks/useProfesor';
import ErrorHandler from '../../utils/errorManagment';
import { Profesor } from '../../models/Profesor/Profesor';
import { updateToken } from '../../utils/axiosUtils';
import toaster from 'react-hot-toast';
import { Button } from '../../components/Shared/Button/Button';
import { Text } from '../../components/Shared/Text/Text';
import { theme } from '../../config/styled/styled';
export default function CambiarPassword() {
  const currentPasswordRef = useRef<HTMLInputElement | null>(null);
  const profesor = useProfesor((state) => state.profesor);
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [newPasswordError, setNewPasswordError] = useState(false);

  return (
    <Container $direction="column" $width="100%">
      <Input vertical ref={currentPasswordRef} width="38rem" name="currentPassword" label="contraseña actual" type="password"></Input>
      <Input
        vertical
        width="38rem"
        name="newPassword"
        label="nueva contraseña"
        value={newPassword}
        onChange={(event) => onChangeNewPassword(event)}
        type="password"
        isError={newPasswordError}></Input>
      {newPasswordError && (
        <Container $bgColor={theme.colors.tertiary.light} $width="38rem">
          <Text $color={theme.colors.red.dark}>
            la nueva contraseña debe ser de 8 caracteres y contener al menos una letra y un numero sin símbolos ni caracteres especiales
          </Text>
        </Container>
      )}
      <Input
        vertical
        width="38rem"
        name="confirmPassword"
        label="confirmación"
        type="password"
        value={confirmPassword}
        onChange={(e) => onConfirmPasswordValueChange(e)}
        isError={confirmPasswordError}
      />

      {confirmPasswordError && (
        <Container $bgColor={theme.colors.tertiary.light} $width="38rem">
          <Text $color={theme.colors.red.dark}>confirme su nueva contraseña</Text>
        </Container>
      )}

      <Button
        $width="max-content"
        $primary
        onClick={() => handleChangePassword({ userId: profesor!.userId, newPassword, currentPassword: currentPasswordRef.current!.value })}>
        Cambiar contraseña
      </Button>
    </Container>
  );
  function onChangeNewPassword(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const filter = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const result = filter.test(value);
    setNewPassword(value);
    if (!result) {
      setNewPasswordError(true);
    } else {
      setNewPasswordError(false);
    }
    if (confirmPassword !== value) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  }

  function onConfirmPasswordValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newValue = event.target.value;
    setConfirmPassword(newValue);
    if (newValue !== newPassword) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }
  }
  async function handleChangePassword({ userId, newPassword, currentPassword }: { currentPassword: string; userId: string; newPassword: string }) {
    try {
      if (!currentPassword || currentPassword.length < 8) throw new Error('Su contraseña actual debe contener al menos 8 caracteres');
      if (newPasswordError || confirmPasswordError) throw new Error('debe corregir todos los errores');
      const response = await Profesor.changeProfesorPassword({ userId, newPassword, currentPassword });
      updateToken(response);
      if (!response.data.ok) throw new Error(response.data.message);
      toaster.success('se cambió el password');
    } catch (error) {
      ErrorHandler(error);
    }
  }
}
