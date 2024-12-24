type EstadoMatricula = 'DEFINITIVA' | 'EN PROCESO' | 'TRASLADADO' | 'RETIRADO';
type TipoApoderado = 'MADRE' | 'PADRE' | 'APODERADO';
type Sexo = 'Hombre' | 'Mujer';

type NuevoApoderado = {
  apellidos: string;
  nombres: string;
  nombreCompleto: string;
  dni: string;
  correo: string;
  telefono: string;
  relacion: TipoApoderado;
};

type Apoderado = NuevoApoderado & { _id: string };

export interface AMatriculado {
  // Alumno Matriculado
  _id: string;
  nombres: string;
  apellidos: string;
  grado: Grado;
  seccion: Seccion;
  estadoMatricula: EstadoMatricula;
  fechaMatricula: string;
  fechaRetiro?: string;
  sexo: Sexo;
  dni?: string;
  codigoEstudiante: string;
  nombreCompleto: string;
  apoderados?: Apoderado[];
}
export interface NuevoAlumno {
  nombres: string;
  apellidos: string;
  grado: Grado;
  seccion: Seccion;
  fechaMatricula: string;
  sexo: Sexo;
  dni?: string;
  codigoEstudiante: string;
}

export type PartialAlumno = {
  [item in keyof AMatriculado]?: AMatriculado[item];
};
