import type { CreateGradoDTO } from '@/types/GradoTypes';
import axios from "axios";

export default class GradoService {
  static BASE_URL = "http://localhost:3000/api/grado";

  static async crearGrado( token: string | null, grado: CreateGradoDTO) {
    try {
      const response = await axios.post( 
        `${ this.BASE_URL }/crearGrado`,
        { grado },
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

  static async obtenerGrado( token: string | null, gradoId: string ) {
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/${ gradoId }`,
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

  static async listarGrados( token: string | null ) {
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/listarGrados`,
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

  static async actualizarGrado( token: string | null, gradoId: string, data: any ) {
    try {
      const response = await axios.put( 
        `${ this.BASE_URL }/${ gradoId }`,
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

  static async eliminarGrado( token: string | null, gradoId: string ) {
    try {
      const response = await axios.delete( 
        `${ this.BASE_URL }/${ gradoId }`,
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