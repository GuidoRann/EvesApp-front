import type { GradoType } from './GradoTypes';
import type { MaestraType } from './MaestraTypes';

export interface MateriaType {
  materiaId: string;
  nombre: string;
  maestra: MaestraType;
  grado: GradoType;
}

export interface CreateMateriaDTO {
  nombre: string;
  maestra: MaestraType;
  grado: GradoType;
}