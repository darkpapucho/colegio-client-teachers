import { Periodo } from '../types/gradoSalon';

export function convertPeriodoKeyToLabel(periodoKey: Periodo | null) {
  switch (periodoKey) {
    case 'primerPeriodo':
      return 'Primer Periodo';
    case 'segundoPeriodo':
      return 'Segundo Periodo';
    case 'tercerPeriodo':
      return 'Tercer periodo';
    case 'cuartoPeriodo':
      return 'Cuarto Periodo';
    default:
      return 'primierPeriodo';
  }
}
