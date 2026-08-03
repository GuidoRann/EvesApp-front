import type { AlumnoType } from './AlumnoTypes';
import type { EscuelaDTO } from './EscuelaTypes';
import type { MaestraType } from './MaestraTypes';

export interface GradoType {
  gradoId: string;
  numero: number;
  letra: string;
  turno: "mañana" | "tarde";
  divisionAnual: "bimestre" | "trimestre";
  escuela: EscuelaDTO;
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