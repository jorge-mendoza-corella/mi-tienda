const axios = require('axios');

class SolicitudesApiExternaService {

  static _solicitudesApiExternaServiceInstance = null;

  static getInstance() {
    if (SolicitudesApiExternaService._solicitudesApiExternaServiceInstance === null) {
      SolicitudesApiExternaService._solicitudesApiExternaServiceInstance = new SolicitudesApiExternaService();
    }
    return SolicitudesApiExternaService._solicitudesApiExternaServiceInstance;
  }

  async hacerSolicitud(url, token) {
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

}
module.exports = SolicitudesApiExternaService;
