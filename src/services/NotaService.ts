import type { CreateListadoNotasDTO, CreateNotaDTO } from '@/types/NotaTypes';
import axios from 'axios';

export default class NotaService {
  static BASE_URL = "http://localhost:3000/api/nota";

  static async crearNota( token: string | null, nota: CreateNotaDTO ) {
    try {
      const response = await axios.post( 
        `${ this.BASE_URL }/crearNota`,
        nota,
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

  static async crearListadoNotas( token: string | null, notas: CreateListadoNotasDTO ) {
    try {
      const response = await axios.post( 
        `${ this.BASE_URL }/crearListadoNotas`,
        notas,
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

  static async obtenerNotasPorAlumno( token: string | null, alumnoId: string ) {
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

  static async actualizarNota( token: string | null, notaId: string, data: any ) {
    try {
      const response = await axios.put( 
        `${ this.BASE_URL }/${ notaId }`,
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

  static async eliminarNota( token: string | null, notaId: string ) {
    try {
      const response = await axios.delete( 
        `${ this.BASE_URL }/${ notaId }`,
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