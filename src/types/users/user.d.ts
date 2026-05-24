export type UserRol = 'profesor' | 'psicologo';

export type User = {
  nombres: string;
  apellidos: string;
  dni: string;
  telefono?: number;
  rol: UserRol;
  _id: string;
  userId: string;
};
