import { useMutation } from '@tanstack/react-query';
import { Container } from '../../../components/Shared/Container/Container';
import Input from '../../../components/Shared/Input/Input';
import Alumno from '../../../models/Alumno/Alumno';
import { useContext, useEffect, useRef, useState } from 'react';
import { isCorreo, isDni, isNombreCompleto, isTelefono } from '../../../utils/asserts';
import { updateToken } from '../../../utils/axiosUtils';
import { queryClient } from '../../../config/reactQuery/reactQuery';
import useGradoSeccionSearchParams from '../../../hooks/useGradoSeccionSearchParams';
import { nivelState } from '../../../config/zustand/nivel';
import { Grado, Nivel, Seccion } from '../../../types/gradoSalon';
import fetchListaAlumnos from '../fetchSalones';
import { Button } from '../../../components/Shared/Button/Button';
import ErrorHandler from '../../../utils/errorManagment';
import { NuevoApoderado, TipoApoderado } from '../../../types/alumno';
import { MisSalonesContext } from '../MisSalones';
import Select from '../../../components/Shared/Select/Select';
import useCustomEvent from '../../../hooks/useCustomEvent';
import { Text } from '../../../components/Shared/Text/Text';

const relacionSlectOptions = [
  { label: 'MADRE', value: 'MADRE' },
  { label: 'PADRE', value: 'PADRE' },
  { label: 'APODERADO', value: 'APODERADO' },
];

export default function AgregarApoderadoCard({ alumnoId }: { alumnoId: string }) {
  const { searchParams } = useGradoSeccionSearchParams();
  const [relacion, setRelacion] = useState<TipoApoderado>('MADRE');
  const nivel = nivelState((state) => state.nivel) as Nivel;
  const nombresRef = useRef<HTMLInputElement>(null);
  const apellidosRef = useRef<HTMLInputElement>(null);
  const dniRef = useRef<HTMLInputElement>(null);
  const telefonoRef = useRef<HTMLInputElement>(null);
  const correoRef = useRef<HTMLInputElement>(null);
  const { setSelectedAlumno } = useContext(MisSalonesContext)!;
  const { mutate, isPending, error } = useMutation({
    mutationFn: handleAgregarApoderado,
    mutationKey: ['agregar-apoderado'],
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
  useCustomEvent('customSelect', selectListener);
  useEffect(() => {
    if (!error) return;
    ErrorHandler(error);
  }, [error]);
  return (
    <Container $direction="column" $gap="0.5rem" $padding=".8rem" $width="100%" $bgColor="#40c7f0">
      <Text $normal $fontSize="2rem" $fontWeight="700" $color="#2020A0">
        NUEVO APODERADO
      </Text>
      <Container $direction="row" $gap="0.5rem" $alignItems="center" $width="100%">
        <Input
          vertical
          labelColor="black"
          label="APELLIDOS"
          name="apellidos"
          width="50%"
          type="text"
          ref={apellidosRef}
        />
        <Input vertical labelColor="black" label="NOMBRES" name="nombres" width="50%" type="text" ref={nombresRef} />
      </Container>
      <Container $direction="row" $gap="0.5rem" $alignItems="center" $width="100%" ref={dniRef}>
        <Input vertical labelColor="black" label="DNI" name="dni" width="50%" type="text" ref={dniRef} />
        <Input vertical labelColor="black" label="TELEFONO" name="telefono" width="50%" type="text" ref={telefonoRef} />
        <Input vertical labelColor="black" label="CORREO" name="correo" width="50%" type="text" ref={correoRef} />
      </Container>
      <Container $direction="row" $gap="0.5rem" $alignItems="center" $width="100%" ref={dniRef}>
        <Select
          label="RELACIÓN"
          name="relacion"
          width="50%"
          options={relacionSlectOptions}
          defaultValue={{ label: relacion, value: relacion }}
        />

        <Button $width="50%" $primary onClick={() => mutate()} disabled={isPending}>
          AGREGAR
        </Button>
      </Container>
    </Container>
  );

  async function handleAgregarApoderado() {
    const apellidos = apellidosRef.current?.value || '';
    const nombres = nombresRef.current?.value || '';
    const dni = dniRef.current?.value || '';
    const telefono = telefonoRef.current?.value;
    const correo = correoRef.current?.value || '';
    if (!telefono) throw new Error('El teléfono es requerido');
    isTelefono(telefono);
    isDni(dni);
    isCorreo(correo);
    isNombreCompleto(`${nombres} ${apellidos}`);
    const nuevoApoderado: NuevoApoderado = {
      apellidos,
      nombres,
      dni,
      correo,
      telefono,
      nombreCompleto: `${nombres} ${apellidos}`,
      relacion,
    };

    const response = await Alumno.agregarApoderado({
      alumnoId: alumnoId,
      nuevoApoderado,
    });
    updateToken(response);
    if (!response.data.ok) throw new Error(response.data.message || 'Error al agregar el apoderado');
    return response.data.payload;
  }
  function selectListener(event: CustomEvent) {
    const { name, value } = event.detail;
    if (name === 'relacion') {
      setRelacion(value as TipoApoderado);
    }
  }
}
