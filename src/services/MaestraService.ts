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

  static async obtenerPerfil( token: string | null ){
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/maestra/me`,
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

  // TODO: Revisar tipo de data para no enviar "any"
  static async actualizarMaestra( token: string | null, maestraId: string, data: any ){
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
}