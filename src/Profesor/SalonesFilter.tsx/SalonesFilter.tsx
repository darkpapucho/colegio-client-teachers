import { Container } from '../../components/Shared/Container/Container';
import { SalonProfesor } from '../../hooks/useProfesor';
import Select from '../../components/Shared/Select/Select';
import { generateGrados, generateSecciones } from '../../utils/profesor';
import { nivelState } from '../../config/zustand/nivel';
import { memo } from 'react';
import useGradoSeccionSearchParams from '../../hooks/useGradoSeccionSearchParams';

const SalonesFilter = memo(({ salones }: { salones: SalonProfesor[] }) => {
  const { grado } = useGradoSeccionSearchParams();
  const grados = generateGrados(salones);
  const secciones = generateSecciones(grado, salones);
  const nivel = nivelState((state) => state.nivel)!;

  return (
    <Container $direction="row" $width="max-content" $gap="1rem">
      <Select options={grados} width={nivel == 'inicial' ? '13rem' : '10rem'} name="grado" label="Grado" />
      {grado && <Select options={secciones} width="8rem" name="seccion" label="Sección" />}
    </Container>
  );
});

export default SalonesFilter;
