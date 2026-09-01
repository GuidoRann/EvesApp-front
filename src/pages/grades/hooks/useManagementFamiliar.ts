import { supabase } from '@/lib/supabaseClient';
import FamiliarService from '@/services/FamiliarService';
import type { CreateAlumnoFamiliarDTO } from '@/types/AlumnoFamiliarTypes';
import type { CreateFamiliarDTO } from '@/types/FamiliarTypes';

export const useManagementFamiliar = () => {

  const crearFamiliar = async ( familiar: CreateFamiliarDTO, parentesco: string, alumnoId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
            
      if ( !token ) return;

      const alumnoFamiliar: CreateAlumnoFamiliarDTO = {
        alumnoId,
        familiar,
        parentesco
      }

      const response = await FamiliarService.crearFamiliar( token, alumnoFamiliar );

      return response.body;
    } catch ( error ) {
      console.log( error );      
    } 
  }

  const obtenerFamiliar = async ( familiarId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
            
      if ( !token ) return;

      return await FamiliarService.obtenerFamiliar( token, familiarId );
    } catch ( error ) {
      console.log( error );      
    }
  }

  return { 
    crearFamiliar,
    obtenerFamiliar 
  }
}