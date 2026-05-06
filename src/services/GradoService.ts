import axios from "axios";

export default class GradoService {
  static BASE_URL = "http://localhost:3000/api/grado";

  static async crearGrado( token: string | null) {
    try {
      const response = await axios.get( 
        `${ this.BASE_URL }/crearGrado`,
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