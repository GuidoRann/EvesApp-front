import type { AlumnoType } from './AlumnoTypes';

export interface GradoType {
  gradoId: string;
  escuelaId: string;
  numero: string;
  letra: string;
  turno: string;
  divisionAnual: string;
  maestraTitularId: string;
  maestrasIds: string[];
  alumnos: AlumnoType[];
}

export interface CreateGradoDTO {
  escuelaId: string;
  numero: string;
  letra: string;
  turno: string;
  divisionAnual: string;
  maestraTitularId: string;
}