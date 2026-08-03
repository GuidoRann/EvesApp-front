import type { AlumnoType } from './AlumnoTypes';

export interface FamiliarType {
  familiarId: string;
  nombre: string;
  apellido: string;
  direccion: string;
  numeroTelefono: string;
  ocupacion: string;
  alumno: AlumnoType[];
}

export interface CreateFamiliarDTO {
  nombre: string;
  apellido: string;
  direccion: string;
  numeroTelefono: string;
  ocupacion: string;
  alumno: AlumnoType[];
}