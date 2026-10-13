import type { AlumnoType } from './AlumnoTypes';

export interface AsistenciaType {
  asistenciaId: string;
  fecha: Date;
  asistio: boolean;
  observaciones: string;
  alumno: AlumnoType;
}

export interface AsistenciaAlumnoDTO {
  alumnoId: string;
  asistio: boolean;
}

export interface CreateAsistenciaDTO {
  fecha: Date;
  alumnos: AsistenciaAlumnoDTO[];
}