import { useLayoutEffect, useMemo } from 'react';
import { Container } from '../../components/Shared/Container/Container';
import { SalonProfesor } from '../../hooks/useProfesor';
import useGradoSeccionSearchParams from '../../hooks/useGradoSeccionSearchParams';
import Select from '../../components/Shared/Select/Select';
import { generateGrados, generateSecciones } from '../../utils/profesor';
import { nivelState } from '../../config/zustand/nivel';

export default function SalonesFilter({ salones }: { salones: SalonProfesor[] }) {
  const { grado, setSearchParams } = useGradoSeccionSearchParams();

  const grados = useMemo(() => generateGrados(salones), [salones]);
  const secciones = useMemo(() => generateSecciones(grados[0].value, salones), [grados]);
  const nivel = nivelState((state) => state.nivel)!;
  useLayoutEffect(() => {
    setSearchParams((old) => {
      old.set('grado', grados[0].value);
      old.set('seccion', secciones[0].value);
      return old;
    });
  }, []);
  return (
    <Container $direction="row" $width="max-content" $gap="1rem">
      <Select options={grados} width={nivel == 'inicial' ? '13rem' : '10rem'} name="grado" label="Grado" defaultValue={grados[0]} />
      {grado && <Select options={generateSecciones(grado, salones)} width="8rem" name="seccion" label="Sección" defaultValue={secciones[0]} />}
    </Container>
  );
}
