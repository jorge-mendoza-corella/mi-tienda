const faker = require('faker');
const boom = require('@hapi/boom');
const resultFromQuery = require('../utilities/acciones.db');
const { models } = require('../libs/sequelize');

class MuchosService {


  static _muchosServiceInstance = null;

  static getInstance() {
    if (MuchosService._muchosServiceInstance === null) {
      MuchosService._muchosServiceInstance = new MuchosService();
    }
    return MuchosService._muchosServiceInstance;
  }


  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async create(data) {
    const nuevaMuchos = await models.Muchos.create(data);
    return nuevaMuchos;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM) O POR UNA CONSULTA DIRECTA CONECTADO POR POOL
  async find(next) {
    const muchos = await models.Muchos.findAll({
      include: ['uno']
    });
    // const query = 'SELECT * FROM MuchosS where c=1';
    // const Muchos = await resultFromQuery(this.pool, query, null, true, next);

    return muchos;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async findOne(id) {
    const muchos = await models.Muchos.findByPk(id, {
      include: ['uno']
    });
    if (!muchos) {
      throw boom.notFound('Muchos no encontrado');
    }
    return muchos;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async update(id, cambios) {
    const muchos = await this.findOne(id);
    const resp = await muchos.update(cambios);

    // Recargar la instancia del original para obtener los datos actualizados
    await resp.reload();

    return resp;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async delete(id) {
    const muchos = await this.findOne(id);
    await muchos.destroy();
    return { id };
  }
}

module.exports = MuchosService;
