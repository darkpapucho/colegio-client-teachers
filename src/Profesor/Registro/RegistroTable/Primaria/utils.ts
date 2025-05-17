import { Nota, Periodo } from '../../../../types/gradoSalon';

export const EVENT_NAME = 'notaCursoUpdate';

export function convertPeriodoKeyToIndex(periodo: Periodo): number {
  switch (periodo) {
    case 'primerPeriodo':
      return 0;
    case 'segundoPeriodo':
      return 1;
    case 'tercerPeriodo':
      return 2;
    case 'cuartoPeriodo':
      return 3;
    default:
      return 0;
  }
}

export function convertToLetras(number: number) {
  switch (number) {
    case 1:
      return 'C';
    case 2:
      return 'B';
    case 3:
      return 'A';
    case 4:
      return 'AD';
    case 0:
      return '';
    default:
      throw new Error('ERROR CONVIRTIENDO NUMBERO A LETRA: NOTA INVÁLIDA');
  }
}
export function convertToNumbers(letra: Nota | ''): number {
  switch (letra) {
    case 'A':
      return 3;
    case 'B':
      return 2;
    case 'C':
      return 1;
    case 'AD':
      return 4;
    case '':
      return 0;
    default:
      throw new Error('ERROR CONVIRTIENDO LETRA A NUMERO: NOTA INVÁLIDA');
  }
}

export function CalcularPromedioCompetencias(notas: (Nota | '')[]) {
  const length = notas.length;
  if (length === 0) {
    return '-';
  }
  const notasNumbers: number[] = [];
  for (const nota of notas) {
    notasNumbers.push(convertToNumbers(nota));
  }
  const promedio = convertToLetras(notasNumbers.reduce((acc, curr) => acc + curr, 0) / length);
  return promedio;
}

export function DeterminateState(notas: (Nota | '')[]) {
  const length = notas.length;
  let isCompletedCounter = 0;
  for (const nota of notas) {
    if (nota !== '') {
      isCompletedCounter++;
    }
  }
  return isCompletedCounter === length;
}

export function generateEditCompetenciasOptions({ cursoKey, index, periodo }: { periodo: Periodo; cursoKey: string; index: number }) {
  return [
    { label: 'A', value: { cursoKey: cursoKey, index, nota: 'A', periodo } },
    { label: 'B', value: { cursoKey: cursoKey, index, nota: 'B', periodo } },
    { label: 'C', value: { cursoKey: cursoKey, index, nota: 'C', periodo } },
    { label: 'AD', value: { cursoKey: cursoKey, index, nota: 'AD', periodo } },
  ];
}

export function getSelectedPeriodo(searchParams: URLSearchParams) {
  const periodo = (searchParams.get('periodo') || 'primerPeriodo') as Periodo;
  return periodo;
}

export function getColorsByNota(nota: number) {
  if (nota < 0 || nota > 20) return { bgColor: '#404040', textColor: '#f0f0f0' };
  if (nota > 17 && nota <= 20) {
    return { bgColor: '#3380e4', textColor: '#fdfdfd' };
  } else if (nota <= 17 && nota > 14) {
    return { bgColor: '#469e61', textColor: '#e5ece7' };
  } else if (nota <= 14 && nota > 10) {
    return { bgColor: '#c47e2e', textColor: '#e6e3df' };
  } else {
    return { bgColor: '#be361e', textColor: '#eeeaea' };
  }
}
export function convertNumberToLetra(nota: number) {
  /**
   *  0-10 = C ; 11 - 14 : B ; 15- 17: A, 18 - 20 : AD
   */
  if (nota < 0 || nota > 20) return 'X';
  if (nota > 17 && nota <= 20) {
    return 'AD';
  } else if (nota <= 17 && nota > 14) {
    return 'A';
  } else if (nota <= 14 && nota > 10) {
    return 'B';
  } else {
    return 'C';
  }
}
