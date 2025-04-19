import { EventProps } from 'react-big-calendar';

//months go from 0 - 11
export interface MyCustomEvent extends EventProps {
  curso?: string;
  salon?: string;
}

export function convertNumberToDayName(num: number) {
  switch (num) {
    case 1:
      return 'Lunes';
    case 2:
      return 'Martes';
    case 3:
      return 'Miércoles';
    case 4:
      return 'Jueves';
    case 5:
      return 'Viernes';
    default:
      throw new Error('invalid day');
  }
}

export function parseSalonToDisplayCalendarSalon(salon: string) {
  const grado = salon.substring(0, salon.lastIndexOf(' '));
  const seccion = salon.substring(salon.lastIndexOf(' ') + 1);
  switch (grado) {
    case 'PRIMERO':
      return `1° ${seccion}`;
    case 'SEGUNDO':
      return `2° ${seccion}`;
    case 'TERCERO':
      return `3° ${seccion}`;
    case 'CUARTO':
      return `4°${seccion}`;
    case 'QUINTO':
      return `5° ${seccion}`;
    case 'SEXTO':
      return `6° ${seccion}`;
    case 'Grupo 3 años':
      return `3años ${seccion}`;
    case 'Grupo 4 años':
      return `4años ${seccion}`;
    case 'Grupo 5 años':
      return `5años ${seccion}`;
    default:
      return salon;
  }
}
export function praseCursoToDisplayCalendarCurso(curso: string) {
  switch (curso) {
    case 'Arte y Cultura':
      return 'ARTE';
    case 'Ciencia y Tecnología':
      return 'CC.TT';
    case 'Personal Social':
      return 'PP.SS';
    default:
      return curso;
  }
}
