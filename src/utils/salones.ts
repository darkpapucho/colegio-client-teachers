import { Nivel } from '../types/gradoSalon';

export const GRADOS = {
  inicial: ['Grupo 3 años', 'Grupo 4 años', 'Grupo 5 años'],
  primaria: ['PRIMERO', 'SEGUNDO', 'TERCERO', 'CUARTO', 'QUINTO', 'SEXTO'],
  secundaria: ['PRIMERO', 'SEGUNDO', 'TERCERO', 'CUARTO', 'QUINTO'],
};

export const SECCIONES = ['A', 'B'];

export const GRADOS_SELECT_OPTIONS = (nivel: Nivel) => {
  return GRADOS[nivel].map((row) => {
    return { label: row, value: row };
  });
};

export const SECCION_SELECT_OPTIONS = () => {
  return SECCIONES.map((row) => ({ label: row, value: row }));
};
