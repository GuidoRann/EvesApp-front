import type { AlumnoType } from './AlumnoTypes';
import type { CreateFamiliarDTO, FamiliarType } from './FamiliarTypes';

export interface AlumnoFamiliarType {
  alumnoFamiliarId: string;
  alumno: AlumnoType;
  familiar: FamiliarType;
  parentesco: string;
}

export interface CreateAlumnoFamiliarDTO {
  familiar: CreateFamiliarDTO;
  alumnoId: string;
  parentesco: string;
}