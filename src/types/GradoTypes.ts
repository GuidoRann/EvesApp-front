import type { AlumnoType } from './AlumnoTypes';
import type { EscuelaType } from './EscuelaTypes';
import type { MaestraType } from './MaestraTypes';

export interface GradoType {
  gradoId: string;
  numero: number;
  letra: string;
  turno: string;
  divisionAnual: string;
  escuela: EscuelaType;
  maestraTitular: MaestraType;
  maestrasAdicionales: MaestraType[];
  listaAlumnos: AlumnoType[];
}

export interface CreateGradoDTO {
  escuelaId: string;
  numero: string;
  letra: string;
  turno: string;
  divisionAnual: string;
  maestraTitularId: string;
  listaAlumnos: AlumnoType[];
}