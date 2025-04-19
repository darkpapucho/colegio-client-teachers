import { create } from 'zustand';
import { Grado, Seccion } from '../types/gradoSalon';
import { HorarioCell } from '../types/horario';
import { ProfesorAnnouncement } from '../types/announcements';
export type SalonProfesor = {
  tutor: boolean;
  label: string;
  value: { grado: Grado; seccion: Seccion };
  order: number;
  cursos: { label: string; key: string }[];
};
export type Profesor = {
  nombres: string;
  apellidos: string;
  dni: number;
  salones: SalonProfesor[];
  telefono?: number;
  rol: 'profesor';
  userId: string;
  _id: string;
  horario: HorarioCell[];
  anuncios: ProfesorAnnouncement[];
};
type State = {
  profesor: Profesor | null;
};
type Action = {
  setProfesor: (profesor: Profesor) => void;
  clearProfesor: () => void;
  setHorario: (horario: HorarioCell[]) => void;
  setAnuncios: (anuncion: ProfesorAnnouncement[]) => void;
};
export const useProfesor = create<State & Action>((set) => ({
  profesor: null,
  setAnuncios: (anuncios: ProfesorAnnouncement[]) => {
    set((state) => {
      state.profesor!.anuncios = anuncios;
      return { profesor: state.profesor };
    });
  },
  setHorario: (horario: HorarioCell[]) => {
    set((state) => {
      if (!state.profesor?.horario) return { profesor: state.profesor };
      state.profesor.horario = horario;
      return { profesor: state.profesor };
    });
  },
  setProfesor: (profesor) => set(() => ({ profesor: profesor })),
  clearProfesor: () => set({ profesor: null }),
}));
