import type { EscuelaDTO } from './EscuelaTypes';
import type { GradoType } from './GradoTypes';

export interface MaestraType {
  maestraId: string;
  supabaseUserId: string;
  nombre: string;
  apellido: string;
  email: string;
  escuelas: EscuelaDTO[];
  gradosComoTitular: GradoType[];
  gradosGeneral: GradoType[];
  avatar_url: string;
  created_at: string;
  updated_at: string;
}

export interface CreateMaestraDTO {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
}