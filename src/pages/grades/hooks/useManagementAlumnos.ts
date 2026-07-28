import { supabase } from '@/lib/supabaseClient';
import AlumnoService from '@/services/AlumnoService';
import type { CreateAlumnoDTO } from '@/types/AlumnoTypes';

export const useManagementAlumnos = () => {
  
  const crearAlumno = async ( alumno: CreateAlumnoDTO ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      
      if ( !token ) return;

      const response = await AlumnoService.crearAlumno( token, alumno );

      return response.body;
    } catch ( error ) {
      console.log( error );
    }
  };

  const obtenerAlumno = async ( alumnoId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      
      if ( !token ) return;

      return await AlumnoService.obtenerAlumno( token, alumnoId );
    } catch ( error ) {
      console.log( error );
    }
  };

  const actualizarAlumno = async ( alumnoId: string, alumno: CreateAlumnoDTO ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      
      if ( !token ) return;

      return await AlumnoService.actualizarAlumno( token, alumnoId, alumno );
    } catch ( error ) {
      console.log( error );
    }
  };

  const eliminarAlumno = async ( alumnoId: string ) => {
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token;
      
      if ( !token ) return;

      return await AlumnoService.eliminarAlumno( token, alumnoId );
    } catch ( error ) {
      console.log( error );
    }
  };

  return { 
    crearAlumno,
    obtenerAlumno,
    actualizarAlumno,
    eliminarAlumno
  };
}