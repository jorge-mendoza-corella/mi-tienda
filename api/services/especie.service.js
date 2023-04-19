const faker = require('faker');
const boom = require('@hapi/boom');
const resultFromQuery = require('../utilities/acciones.db');
const { models } = require('../libs/sequelize');

class EspecieService {


  static _especiesServiceInstance = null;

  static getInstance() {
    if (EspecieService._especiesServiceInstance === null) {
      EspecieService._especiesServiceInstance = new EspecieService();
    }
    return EspecieService._especiesServiceInstance;
  }


  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async create(data) {
    const nuevaEspecie = await models.Especie.create(data);
    return nuevaEspecie;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM) O POR UNA CONSULTA DIRECTA CONECTADO POR POOL
  async find(next) {
    const especies = await models.Especie.findAll({
      include: ['animales']
    });
    // const query = 'SELECT * FROM especieS where c=1';
    // const especies = await resultFromQuery(this.pool, query, null, true, next);

    return especies;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async findOne(id) {
    const especies = await models.Especie.findByPk(id, {
      include: ['animales']
    });
    if (!especies) {
      throw boom.notFound('Especie no encontrada');
    }
    return especies;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async update(id, cambios) {
    const especie = await this.findOne(id);
    const resp = await especie.update(cambios);

    // Recargar la instancia del original para obtener los datos actualizados
    await resp.reload();

    return resp;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async delete(id) {
    const especie = await this.findOne(id);
    await especie.destroy();
    return { id };
  }
}

module.exports = EspecieService;
