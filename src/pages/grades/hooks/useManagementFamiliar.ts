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
        familiar,
        alumnoId,
        parentesco
      }

      console.log("AlumnoFamiliar en managementFamiliar:", alumnoFamiliar);
      
      const response = await FamiliarService.crearFamiliar( token, alumnoFamiliar );

      return response.body;
    } catch ( error ) {
      console.log( error );      
    } 
  }

  return { 
    crearFamiliar 
  }
}