import type { CreateAlumnoFamiliarDTO } from '@/types/AlumnoFamiliarTypes';
import axios from 'axios';

export default class FamiliarService {
  static BASE_URL = "http://localhost:3000/api/familiar";

  static async crearFamiliar( token: string | null, alumnoFamiliar: CreateAlumnoFamiliarDTO ) {
    try {
      const response = await axios.post( 
        `${ this.BASE_URL }/crearFamiliar`,
        alumnoFamiliar,
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

  static async obtenerFamiliar( token: string | null, familiarId: string ) {
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/${ familiarId }`,
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

  static async obtenerFamiliarPorDni( token: string | null, dni: string ) {
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/buscarPorDni/${ dni }`,
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

  static async actualizarFamiliar( token: string | null, familiarId: string, data: any ) {
    try {
      const response = await axios.put( 
        `${ this.BASE_URL }/${ familiarId }`,
        data,
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

  static async eliminarFamiliar( token: string | null, familiarId: string ) {
    try {
      const response = await axios.delete( 
        `${ this.BASE_URL }/${ familiarId }`,
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