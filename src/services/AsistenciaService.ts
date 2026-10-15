import type { CreateAsistenciaDTO } from '@/types/AsistenciaTypes';
import axios from 'axios';

export default class AsistenciaService {
  static BASE_URL = "http://localhost:3000/api/asistencia";

  static async crearAsistencia( token: string | null, asistencias: CreateAsistenciaDTO ) {
    try {
      const response = await axios.post( 
        `${ this.BASE_URL }/crearAsistencias`,
        asistencias,
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

  static async obtenerAsistenciasPorFecha( token: string | null, fecha: string ) {
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/obtenerPorFecha/${ fecha }`,
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

  static async obtenerAsistencia( token: string | null, asistenciaId: string ) {
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/${ asistenciaId }`,
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

  static async actualizarAsistencia( token: string | null, asistenciaId: string, data: any ) {
    try {
      const response = await axios.put( 
        `${ this.BASE_URL }/${ asistenciaId }`,
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

  static async eliminarAsistencia( token: string | null, asistenciaId: string ) {
    try {
      const response = await axios.delete( 
        `${ this.BASE_URL }/${ asistenciaId }`,
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