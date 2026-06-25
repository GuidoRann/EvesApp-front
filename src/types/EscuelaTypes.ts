import type { GradoDTO } from './GradoTypes';
import type { MaestraDTO } from './MaestraTypes';

export interface EscuelaDTO {
  escuelaId: string
  nombre: string
  numero: string
  direccion: string
  telefono: string
  listaGrados: GradoDTO[]
  maestras: MaestraDTO[]
}

export interface CreateEscuelaDTO {
  nombre: string
  numero: string
  direccion: string
  telefono: string
}