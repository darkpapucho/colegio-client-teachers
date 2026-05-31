import { UserProps } from './user';

export type Curso = {
  label: string;
  key: string;
  short: string;
  code: string;
};

export type SalonProfesor = {
  tutor: boolean;
  label: string;
  value: { grado: Grado; seccion: Seccion };
  order: number;
  cursos: Curso[];
};

export type Teacher = UserProps & {
  salones: SalonProfesor[];
  horario: HorarioCell[];
  anuncios: ProfesorAnnouncement[];
};
