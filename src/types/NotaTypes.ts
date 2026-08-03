import type { AlumnoType } from './AlumnoTypes';
import type { MateriaType } from './MateriaTypes';

export interface NotaType {
  notaId: string;
  plazo: string; // Primer trimestre, segundo trimestre, etc.
  letra: string;
  peso: number; // Porcentaje para calcular promedio de numero a letra: NS = 20, S = 40, B = 60, MB = 80, E = 100
  alumno: AlumnoType;
  materia: MateriaType;
}

export interface CreateNotaDTO {
  plazo: string;
  letra: string;
  peso: number;
  alumno: AlumnoType;
  materia: MateriaType;
}