import type { EscuelaDTO } from './EscuelaTypes';
import type { GradoDTO } from './GradoTypes';

export interface MaestraDTO {
  maestraId: string;
  supabaseUserId: string;
  nombre: string;
  apellido: string;
  email: string;
  escuelas: EscuelaDTO[];
  gradosTitular: GradoDTO[];
  gradosGeneral: GradoDTO[];
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