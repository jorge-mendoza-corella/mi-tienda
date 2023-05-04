const faker = require('faker');
const boom = require('@hapi/boom');
const resultFromQuery = require('../utilities/acciones.db');
const { models } = require('../libs/sequelize');

class RopaService {


  static _ropasServiceInstance = null;

  static getInstance() {
    if (RopaService._ropasServiceInstance === null) {
      RopaService._ropasServiceInstance = new RopaService();
    }
    return RopaService._ropasServiceInstance;
  }


  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async create(data) {
    const nuevaRopa = await models.Ropa.create(data);
    return nuevaRopa;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM) O POR UNA CONSULTA DIRECTA CONECTADO POR POOL
  async find(next) {
    const ropas = await models.Ropa.findAll({
      include: ['tipoRopa']
    });
    // const query = 'SELECT * FROM RopaS where c=1';
    // const Ropas = await resultFromQuery(this.pool, query, null, true, next);

    return ropas;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async findOne(id) {
    const ropa = await models.Ropa.findByPk(id, {
      include: ['tipoRopa']
    });
    if (!ropa) {
      throw boom.notFound('Ropa no encontrado');
    }
    return ropa;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async update(id, cambios) {
    const ropa = await this.findOne(id);
    const resp = await ropa.update(cambios);

    // Recargar la instancia del original para obtener los datos actualizados
    await resp.reload();

    return resp;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async delete(id) {
    const ropa = await this.findOne(id);
    await ropa.destroy();
    return { id };
  }
}

module.exports = RopaService;
