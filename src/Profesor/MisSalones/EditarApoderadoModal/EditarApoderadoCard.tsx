import { useContext, useEffect, useRef, useState } from 'react';
import { Button } from '../../../components/Shared/Button/Button';
import { Container } from '../../../components/Shared/Container/Container';
import Input from '../../../components/Shared/Input/Input';
import { Apoderado, TipoApoderado } from '../../../types/alumno';
import Select from '../../../components/Shared/Select/Select';
import { Text } from '../../../components/Shared/Text/Text';
import { isDni, isTelefono } from '../../../utils/asserts';
import Alumno from '../../../models/Alumno/Alumno';
import { updateToken } from '../../../utils/axiosUtils';
import { useMutation } from '@tanstack/react-query';
import useGradoSeccionSearchParams from '../../../hooks/useGradoSeccionSearchParams';
import { nivelState } from '../../../config/zustand/nivel';
import { queryClient } from '../../../config/reactQuery/reactQuery';
import { Grado, Nivel, Seccion } from '../../../types/gradoSalon';
import fetchListaAlumnos from '../fetchSalones';
import { MisSalonesContext } from '../MisSalones';
import useCustomEvent from '../../../hooks/useCustomEvent';
import ErrorHandler from '../../../utils/errorManagment';

const relacionSlectOptions = [
  { label: 'MADRE', value: 'MADRE' },
  { label: 'PADRE', value: 'PADRE' },
  { label: 'APODERADO', value: 'APODERADO' },
];

export default function EditarApoderadoCard({ apoderado, alumnoId }: { apoderado: Apoderado; alumnoId: string }) {
  const { setSelectedAlumno } = useContext(MisSalonesContext)!;
  const { searchParams } = useGradoSeccionSearchParams();
  const nivel = nivelState((state) => state.nivel) as Nivel;
  const nombresRef = useRef<HTMLInputElement>(null);
  const apellidosRef = useRef<HTMLInputElement>(null);
  const dniRef = useRef<HTMLInputElement>(null);
  const telefonoRef = useRef<HTMLInputElement>(null);
  const correoRef = useRef<HTMLInputElement>(null);
  const [_relacion, _setRelacion] = useState<TipoApoderado>(apoderado.relacion);
  useCustomEvent('customSelect', selectListener);
  const { mutate, isPending, error } = useMutation({
    mutationKey: ['editar-apoderado', nivel, searchParams.get('grado'), searchParams.get('seccion')],
    mutationFn: handleUpdateApoderado,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['lista-alumnos', nivel, searchParams.get('grado'), searchParams.get('seccion')],
      });
      queryClient.prefetchQuery({
        queryKey: ['lista-alumnos', nivel, searchParams.get('grado'), searchParams.get('seccion')],
        queryFn: () =>
          fetchListaAlumnos({
            grado: searchParams.get('grado') as Grado,
            seccion: searchParams.get('seccion') as Seccion,
          }),
      });
      setSelectedAlumno(null);
    },
  });
  useEffect(() => {
    if (!error) return;
    ErrorHandler(error);
  }, [error]);
  return (
    <Container
      $direction="column"
      $gap="0.5rem"
      $alignItems="start"
      $bgColor="#a0a0a0"
      $padding=".8rem"
      $border="1px solid black">
      <Text $normal $fontSize="2rem" $fontWeight="700" $color="#2020A0">{`${apoderado.relacion.toUpperCase()}`}</Text>
      <Container $direction="row" $gap="0.5rem" $alignItems="center" $width="100%">
        <Input
          ref={apellidosRef}
          vertical
          labelColor="black"
          label="APELLIDOS"
          name="apellidos"
          defaultValue={apoderado.apellidos}
          width="50%"
          type="text"></Input>
        <Input
          ref={nombresRef}
          vertical
          labelColor="black"
          label="NOMBRES"
          name="nombres"
          defaultValue={apoderado.nombres}
          width="50%"
          type="text"></Input>
      </Container>
      <Container $direction="row" $gap="0.5rem" $alignItems="center" $width="100%">
        <Input
          ref={dniRef}
          labelColor="black"
          vertical
          label="DNI"
          name="dni"
          defaultValue={apoderado.dni}
          width="25%"
          type="text"></Input>
        <Input
          ref={telefonoRef}
          labelColor="black"
          vertical
          label="TELÉFONO"
          name="telefono"
          defaultValue={apoderado.telefono}
          width="25%"
          type="text"></Input>
        <Input
          ref={correoRef}
          labelColor="black"
          vertical
          label="CORREO"
          name="correo"
          defaultValue={apoderado.correo}
          width="50%"
          type="text"></Input>
      </Container>
      <Container $direction="row" $gap="0.5rem" $alignItems="center" $width="100%">
        <Select
          label="RELACIÓN"
          name="relacion"
          width="50%"
          options={relacionSlectOptions}
          defaultValue={{ label: apoderado.relacion, value: apoderado.relacion }}
        />
        <Button $width="50%" $primary disabled={isPending} onClick={() => mutate()}>
          GUARDAR CAMBIOS
        </Button>
      </Container>
    </Container>
  );
  async function handleUpdateApoderado() {
    const apellidos = apellidosRef.current?.value || '';
    const nombres = nombresRef.current?.value || '';
    const dni = dniRef.current?.value || '';
    const telefono = telefonoRef.current?.value || '';
    const correo = correoRef.current?.value || '';
    isDni(dni);
    isTelefono(telefonoRef.current?.value || '');
    const apoderadoActualizado: Apoderado = {
      _id: apoderado._id,
      apellidos,
      nombres,
      dni,
      correo,
      telefono,
      nombreCompleto: `${nombres} ${apellidos}`,
      relacion: _relacion,
      issuer: apoderado.issuer,
    };
    const response = await Alumno.editarApoderado({
      alumnoId,
      apoderado: apoderadoActualizado,
    });
    updateToken(response);
    if (!response.data.ok) throw new Error('Error al editar apoderado');
    return response.data.payload;
  }
  function selectListener(e: CustomEvent) {
    if (e.detail.name === 'relacion') {
      _setRelacion(e.detail.value);
    }
  }
}
