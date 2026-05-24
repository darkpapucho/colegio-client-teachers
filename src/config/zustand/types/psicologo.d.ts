import { HorarioCell } from '../../../types/horario';
import { UserProps } from './user';

export type Psicologo = UserProps & {
  horario: HorarioCell[];
};
