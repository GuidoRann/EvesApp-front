import type { GradoType } from './GradoTypes';
import type { MaestraType } from './MaestraTypes';

export interface EscuelaDTO {
  escuelaId: string
  nombre: string
  numero: string
  direccion: string
  telefono: string
  listaGrados: GradoType[]
  maestras: MaestraType[]
}

export interface CreateEscuelaDTO {
  nombre: string
  numero: string
  direccion: string
  telefono: string
}