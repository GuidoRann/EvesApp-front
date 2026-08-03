import type { AlumnoType } from './AlumnoTypes';
import type { FamiliarType } from './FamiliarTypes';

export interface AlumnoFamiliarType {
  alumnoFamiliarId: string;
  alumno: AlumnoType;
  familiar: FamiliarType;
  parentesco: string;
}

export interface CreateAlumnoFamiliarDTO {
  alumno: AlumnoType;
  familiar: FamiliarType;
  parentesco: string;
}