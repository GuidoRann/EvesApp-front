import type { CreateEscuelaDTO } from '@/types/EscuelaTypes';
import axios from "axios";

export default class EscuelaService {
  static BASE_URL = "http://localhost:3000/api/escuela";

  static async crearEscuela( token: string | null, escuela: any ) {
    try {
      const response = await axios.post( 
        `${ this.BASE_URL }/crearEscuela`,
        escuela ,
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

  static async obtenerEscuela( token: string | null, escuelaId: string ) {
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/${ escuelaId }`,
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

  static async unirmeEscuela( token: string | null, escuelaId: string ) {
    try {
      const response = await axios.put( 
        `${ this.BASE_URL }/unirmeEscuela/${ escuelaId }`,
        {},
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

  static async listarEscuelas( token: string | null ) {
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/listarEscuelas`,
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

  static async actualizarEscuela( token: string | null, escuelaId: string, escuela: CreateEscuelaDTO ) {
    try {
      const response = await axios.put( 
        `${ this.BASE_URL }/${ escuelaId }`,
        escuela,
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

  static async eliminarEscuela( token: string | null, escuelaId: string ) {
    try {
      const response = await axios.delete( 
        `${ this.BASE_URL }/${ escuelaId }`,
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