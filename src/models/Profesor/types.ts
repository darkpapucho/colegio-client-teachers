export type CursoInfo = {
  label: string;
  key: string;
  code: string;
  numCompetencias: number;
  competencias: string[];
};

export type CursosMap = {
  [key: string]: CursoInfo;
};

export type CursosMapNivel = {
  [key: string]: CursosMap;
};

export type Nota = 'A' | 'B' | 'C' | 'AD';

export type CursoRegistro = {
  numCompetencias: number;
  primerPeriodo: Nota[];
  segundoPeriodo: Nota[];
  tercerPeriodo: Nota[];
  cuartoPeriodo: Nota[];
};
export type Tardanzas = {
  justificadas: [number, number, number, number];
  injustificadas: [number, number, number, number];
};

export type Inasistencias = {
  justificadas: [number, number, number, number];
  injustificadas: [number, number, number, number];
};

//registro
export type NotasRecordNoTutor = {
  alumnoId: string;
  apellidos: string;
  nombres: string;
  cursos: {
    [key: string]: CursoRegistro;
  };
};
export type NotasRecordTutor = {
  alumnoId: string;
  apellidos: string;
  nombres: string;
  cursos: {
    [key: string]: CursoRegistro;
  };
  conclusionesDescriptivas: [string, string, string, string];
  inasistencias: Inasistencias;
  tardanzas: Tardanzas;
};

//old
export type CursoNotas = {
  numCompetencias: number;
  primerPeriodo: Nota[];
  segundoPeriodo: Nota[];
  tercerPeriodo: Nota[];
  cuartoPeriodo: Nota[];
};

export type RegistroNotasInicialProfesor = {
  alumnoId: string;
  tardanzas?: Tardanzas;
  inasistencias?: Inasistencias;
  conclusionesDescriptivas?: [string, string, string, string];
  cursos: {
    [key: string]: CursoNotas;
  };
  nombres: string;
  apellidos: string;
};

export type RegistroTutor = {
  isTutor: true;
  notas: NotasRecordTutor[];
};

export type RegistroNoTutor = {
  isTutor: false;
  notas: NotasRecordNoTutor[];
};

export type RegistroInicialProfesor = RegistroTutor | RegistroNoTutor;
