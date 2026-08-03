import type { AlumnoType } from './AlumnoTypes';

export interface AsistenciaType {
  asistenciaId: string;
  fecha: Date;
  asistio: boolean;
  observaciones: string;
  alumno: AlumnoType;
}

export interface CreateAsistenciaDTO {
  fecha: Date;
  asistio: boolean;
  alumno: AlumnoType;
}