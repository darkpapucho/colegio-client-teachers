import { create } from 'zustand';

export const NivelesSelect: { label: Nivel; value: Nivel }[] = [
  { label: 'inicial', value: 'inicial' },
  { label: 'primaria', value: 'primaria' },
  { label: 'secundaria', value: 'secundaria' },
];
export type Nivel = 'inicial' | 'primaria' | 'secundaria';

type State = {
  nivel: Nivel | null;
};
type Action = {
  setNivel: (nivel: Nivel) => void;
  resetNivel: () => void;
};

export const nivelState = create<State & Action>((set) => ({
  nivel: null,
  setNivel: (nivel) => set(() => ({ nivel })),
  resetNivel: () => set(() => ({ nivel: null })),
}));
