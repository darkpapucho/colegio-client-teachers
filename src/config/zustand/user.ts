import { create } from 'zustand';
import { Profesor } from './types/profesor';
import { Psicologo } from './types/psicologo';

export type User = Profesor | Psicologo | undefined;

type State = {
  user: User;
  isLoading: boolean;
};
type Action = {
  login: (userData: Profesor | Psicologo) => void;
  logout: () => void;
  updateUser: (data: Partial<Profesor | Psicologo>) => void;
  setIsLoading: (loading: boolean) => void;
};

const useAuth = create<State & Action>((set) => ({
  user: undefined,
  isLoading: false,
  setIsLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
  login: (user: Profesor | Psicologo) => {
    set({ user });
  },
  logout: () => {
    set({ user: undefined });
  },
  updateUser: (updatedData) => {
    set((state) => ({
      user: state.user ? { ...state.user, ...updatedData } : undefined,
    }));
  },
}));

export default useAuth;
