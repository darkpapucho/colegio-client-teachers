import { create } from 'zustand';
import { Psicologo } from './types/psicologo';
import { Teacher } from './types/teacher';

export type User = Teacher | Psicologo | undefined;

type State = {
  user: User;
  isLoading: boolean;
};
type Action = {
  login: (userData: Teacher | Psicologo) => void;
  logout: () => void;
  updateUser: (data: Partial<Teacher | Psicologo>) => void;
  setIsLoading: (loading: boolean) => void;
};

const useAuth = create<State & Action>((set) => ({
  user: undefined,
  isLoading: false,
  setIsLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
  login: (user: Teacher | Psicologo) => {
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
