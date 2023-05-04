const faker = require('faker');
const boom = require('@hapi/boom');
//const resultFromQuery = require('../utilities/acciones.db');
const { models } = require('../libs/sequelize');

class Uno2Service {


  static _uno2sServiceInstance = null;

  static getInstance() {
    if (Uno2Service._uno2sServiceInstance === null) {
      Uno2Service._uno2sServiceInstance = new Uno2Service();
    }
    return Uno2Service._uno2sServiceInstance;
  }


  constructor() {
    this.uno2s = [];
  }

  generate() {
    const limit = 100;
    // usamos el faker
    for (let i = 0; i < limit; i++) {
      this.uno2s.push({
        id: faker.datatype.uuid(),
        nombre: faker.commerce.product(),
        imagen: faker.image.image()
      });
    }
  }

  async create(data) {
    const nuevaUno2 = await models.Uno2.create(data);
    return nuevaUno2;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM) O CON UNA CONSULTA DIRECTA CONECTANDO POR POOL
  async find(next) {
    const uno2s = await models.Uno2.findAll({
      include: ['uno1']
    });
    // const query = 'SELECT * FROM uno2s where c=1';
    // const uno2s = await resultFromQuery(this.pool, query, null, true, next);

    return uno2s;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async findOne(id) {
    const uno2s = await models.Uno2.findByPk(id, {
      include: ['uno1']
    });
    if (!uno2s) {
      throw boom.notFound('Uno2 no encontrado');
    }
    return uno2s;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async update(id, cambios) {
    const uno2s = await this.findOne(id);
    const resp = await uno2s.update(cambios);

    // Recargar la instancia del original para obtener los datos actualizados
    await resp.reload();

    return resp;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async delete(id) {
    const uno2s = await this.findOne(id);
    await uno2s.destroy();
    return { id };
  }
}

module.exports = Uno2Service;
