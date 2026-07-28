import type { AlumnoType } from './AlumnoTypes';
import type { EscuelaDTO } from './EscuelaTypes';
import type { MaestraDTO } from './MaestraTypes';

export interface GradoDTO {
  gradoId: string;
  numero: number;
  letra: string;
  turno: "mañana" | "tarde";
  divisionAnual: "bimestre" | "trimestre";
  escuela: EscuelaDTO;
  maestraTitular: MaestraDTO;
  maestrasAdicionales: MaestraDTO[];
  listaAlumnos: AlumnoType[];
}

export interface CreateGradoDTO {
  escuelaId: string;
  numero: string;
  letra: string;
  turno: string;
  divisionAnual: string;
  maestraTitularId: string;
}