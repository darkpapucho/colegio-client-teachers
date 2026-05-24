import { HorarioCell } from '../../../types/horario';
import { AllowedUserRoles, UserProps } from './user';

export type SalonProfesor = {
  tutor: boolean;
  label: string;
  value: { grado: Grado; seccion: Seccion };
  order: number;
  cursos: { label: string; key: string; short: string; code: string }[];
};
export type Profesor = UserProps & {
  salones: SalonProfesor[];
  horario: HorarioCell[];
  anuncios: ProfesorAnnouncement[];
};
