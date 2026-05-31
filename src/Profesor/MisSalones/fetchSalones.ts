import Alumno from '../../models/Alumno/Alumno';
import { AMatriculado } from '../../types/alumno';
import { Grado, Seccion } from '../../types/gradoSalon';
import { updateToken } from '../../utils/axiosUtils';

export default async function fetchListaAlumnos({ grado, seccion }: { grado: Grado | null; seccion: Seccion | null }) {
  if (!grado || !seccion) throw new Error('Grado y sección son requeridos');
  const response = await Alumno.fetchByGradoSeccion({ grado, seccion });
  updateToken(response);
  if (!response.data.ok) throw new Error(response.data.message || 'Error al obtener los alumnos');
  return response.data.payload as AMatriculado[];
}
