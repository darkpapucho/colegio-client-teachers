import { SalonProfesor } from '../hooks/useProfesor';
import { Seccion } from '../types/gradoSalon';

export function generateGrados(salones: SalonProfesor[]): { label: string; value: string }[] {
  const result = [
    ...new Set(
      salones.map((salon) =>
        JSON.stringify({
          label: salon.value.grado,
          value: salon.value.grado,
        }),
      ),
    ),
  ].map((element) => JSON.parse(element));

  return result;
}

export function generateSecciones(grado: string | null, salones: SalonProfesor[]) {
  if (!grado) return [];
  const options = salones
    .filter((salon) => {
      return salon.value.grado === grado;
    })
    .map((element) => ({ label: element.value.seccion, value: element.value.seccion }));

  return options as { label: Seccion; value: Seccion }[];
}
