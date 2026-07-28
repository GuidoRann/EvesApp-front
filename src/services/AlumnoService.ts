import type { CreateAlumnoDTO } from '@/types/AlumnoTypes';
import axios from 'axios';

export default class AlumnoService {
  static BASE_URL = "http://localhost:3000/api/alumno";
  
  static async crearAlumno( token: string | null, alumno: CreateAlumnoDTO ) {
    try {
      const response = await axios.post( 
        `${ this.BASE_URL }/crearAlumno`,
        alumno ,
        {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        }
      );

      return response.data;
    } catch ( error ) {
      throw error;
    }
  }

  static async obtenerAlumno( token: string | null, alumnoId: string ) {
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/${ alumnoId }`,
        {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        }
      );

      return response.data;
    } catch ( error ) {
      throw error;
    }
  }

  static async actualizarAlumno( token: string | null, alumnoId: string, alumno: CreateAlumnoDTO ) {
    try {
      const response = await axios.put( 
        `${ this.BASE_URL }/${ alumnoId }`,
        alumno,
        {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        }
      );

      return response.data;
    } catch ( error ) {
      throw error;
    }
  }

  static async eliminarAlumno( token: string | null, alumnoId: string ) {
    try {
      const response = await axios.delete( 
        `${ this.BASE_URL }/${ alumnoId }`,
        {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        }
      );

      return response.data;
    } catch ( error ) {
      throw error;
    }
  }
};