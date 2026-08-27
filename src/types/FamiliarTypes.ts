import type { AlumnoFamiliarType } from './AlumnoFamiliarTypes';

export interface FamiliarType {
  familiarId: string;
  nombre: string;
  apellido: string;
  direccion: string;
  numeroTelefono: string;
  ocupacion: string;
  numeroDocumento: string;
  alumno: AlumnoFamiliarType[];
}

export interface CreateFamiliarDTO {
  nombre: string;
  apellido: string;
  direccion: string;
  numeroTelefono: string;
  ocupacion: string;
  numeroDocumento: string;
}