import type { AlumnoType } from '@/types/AlumnoTypes';
import type { MaestraDTO } from '@/types/MaestraTypes';

export interface GradoType {
  gradoId: string
  escuela: string
  numero: string
  letra: string
  turno: string
  divisionAnual: string
  maestraTitular: MaestraDTO
  maestras: MaestraDTO[]
  listaAlumnos: AlumnoType[]
}

export interface GradoDTO {
  gradoId: string
  escuela: string
  numero: string
  letra: string
  turno: string
  divisionAnual: string
}