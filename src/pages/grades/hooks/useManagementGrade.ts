import { supabase } from '@/lib/supabaseClient';
import GradoService from '../service/GradoService';
import type { CreateGradoDTO } from '@/types/GradoTypes';

export const useManagementGrade = () => {
  
  const crearGrado = async ( grado: CreateGradoDTO ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      
      if ( !token ) return;

      return await GradoService.crearGrado( token, grado );
    } catch ( error ) {
      console.log( error );
    }
  }

  const obtenerGrado = async ( gradoId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      
      if ( !token ) return;

      return await GradoService.obtenerGrado( token, gradoId );
    } catch ( error ) {
      console.log( error );
    }
  }

  const listarGrados = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      
      if ( !token ) return;

      return await GradoService.listarGrados( token );
    } catch ( error ) {
      console.log( error );
    }
  }

  const actualizarGrado = async ( gradoId: string, grado: CreateGradoDTO ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      
      if ( !token ) return;

      return await GradoService.actualizarGrado( token, gradoId, grado );
    } catch ( error ) {
      console.log( error );
    }
  }

  const eliminarGrado = async ( gradoId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      
      if ( !token ) return;

      return await GradoService.eliminarGrado( token, gradoId );
    } catch ( error ) {
      console.log( error );
    }
  }

  return { 
    crearGrado, 
    obtenerGrado,
    listarGrados, 
    actualizarGrado, 
    eliminarGrado 
  }
}