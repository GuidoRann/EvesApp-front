import type { updateMaestraDTO } from '@/types/MaestraTypes';
import axios from "axios";

export default class MaestraService {
  static BASE_URL = "http://localhost:3000/api/maestra";

  static async obtenerOCrearMaestra( token: string | null ) {
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/google`, 
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

  static async obtenerMaestra( token: string | null, maestraId: string ){
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/${ maestraId }`,
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

  static async listarMaestras( token: string | null ){
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/listarMaestras`,
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

  static async obtenerPerfil( token: string | null ){
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/me`,
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

  static async actualizarMaestra( token: string | null, maestraId: string, data: updateMaestraDTO ){
    try {
      const response = await axios.put( 
        `${ this.BASE_URL }/${ maestraId }`,
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

  static async eliminarMaestra( token: string | null, maestraId: string ){
    try {
      const response = await axios.delete( 
        `${ this.BASE_URL }/${ maestraId }`,
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