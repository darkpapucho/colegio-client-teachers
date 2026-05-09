import { create } from 'zustand';

export type Year = 2028 | 2027 | 2026 | 2025 | 2024 | 2023 | 2022 | 2021;

type State = {
  year: Year;
};
type Action = {
  setYear: (year: Year) => void;
};

export const yearState = create<State & Action>((set) => ({
  year: new Date().getFullYear() as Year,
  setYear: (year) => set(() => ({ year })),
}));
