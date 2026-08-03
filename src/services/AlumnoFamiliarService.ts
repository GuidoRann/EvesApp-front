import type { CreateAlumnoFamiliarDTO } from '@/types/AlumnoFamiliarTypes';
import axios from 'axios';

export default class AlumnoFamiliarService {
  static BASE_URL = "http://localhost:3000/api/alumno-familiar";

  static async crearAlumnoFamiliar( token: string | null, alumnoFamiliar: CreateAlumnoFamiliarDTO ) {
    try {
      const response = await axios.post( 
        `${ this.BASE_URL }/crearAlumnoFamiliar`,
        alumnoFamiliar ,
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

  static async obtenerAlumnoFamiliar( token: string | null, alumnoFamiliarId: string ) {
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/${ alumnoFamiliarId }`,
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
}