import type { GradoDTO } from './GradoTypes';
import type { MaestraDTO } from './MaestraTypes';

export interface EscuelaDTO {
  escuelaId: string
  nombre: string
  numero: string
  direccion: string
  grados: GradoDTO[]
  maestras: MaestraDTO[]
}

export interface CreateEscuelaDTO {
  nombre: string
  numero: string
  direccion: string
  grados: GradoDTO[]
  maestras: MaestraDTO[]
}