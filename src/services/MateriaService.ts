import axios from 'axios';

export default class MateriaService{
  static BASE_URL = "http://localhost:3000/api/materia"

  static async crearMateria( token: string | null, materia: any ){
    try {
      const response = await axios.post( 
        `${ this.BASE_URL }`,
        materia,
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

  static async obtenerMateria( token: string | null, materiaId: string ){
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/${ materiaId }`,
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

  static async actualizarMateria( token: string | null, materiaId: string, data: any ){
    try {
      const response = await axios.put( 
        `${ this.BASE_URL }/${ materiaId }`,
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

  static async eliminarMateria( token: string | null, materiaId: string ){
    try {
      const response = await axios.delete( 
        `${ this.BASE_URL }/${ materiaId }`,
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