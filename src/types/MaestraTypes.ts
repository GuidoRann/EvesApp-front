export interface MaestraDTO {
  maestraId: string;
  supabaseUserId: string;
  nombre: string;
  apellido: string;
  email: string;
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