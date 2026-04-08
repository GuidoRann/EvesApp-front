import axios from "axios";

export default class MaestraService {
  static BASE_URL = "http://localhost:3000/api/maestra";

  static async obtenerOCrearMaestra( token: string ) {
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

  static async obtenerMaestra( token: string, maestraId: string ){
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

  static async obtenerPerfil( token: string ){
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
}