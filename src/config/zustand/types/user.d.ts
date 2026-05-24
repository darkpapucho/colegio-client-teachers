export type AllowedUserRoles = 'profesor' | 'psicologo';

export interface UserProps {
  nombres: string;
  apellidos: string;
  dni: number;
  telefono?: number;
  rol: AllowedUserRoles;
  userId: string;
  _id: string;
}
