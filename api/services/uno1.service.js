const faker = require('faker');
const boom = require('@hapi/boom');
//const resultFromQuery = require('../utilities/acciones.db');
const { models } = require('../libs/sequelize');

class Uno1Service {


  static _uno1sServiceInstance = null;

  static getInstance() {
    if (Uno1Service._uno1sServiceInstance === null) {
      Uno1Service._uno1sServiceInstance = new Uno1Service();
    }
    return Uno1Service._uno1sServiceInstance;
  }


  constructor() {
    this.uno1s = [];
  }

  generate() {
    const limit = 100;
    // usamos el faker
    for (let i = 0; i < limit; i++) {
      this.uno1s.push({
        id: faker.datatype.uuid(),
        nombre: faker.commerce.product(),
        imagen: faker.image.image()
      });
    }
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async create(data) {
    const nuevaUno1 = await models.Uno1.create(data, {
      include: ['uno2']
    });
    return nuevaUno1;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM) O POR UNA CONSULTA DIRECTA CONECTADO POR POOL
  async find(next) {
    const uno1s = await models.Uno1.findAll({
      include: ['uno2']
    });
    // const query = 'SELECT * FROM UNO1S where c=1';
    // const uno1s = await resultFromQuery(this.pool, query, null, true, next);

    return uno1s;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async findOne(id) {
    const uno1s = await models.Uno1.findByPk(id, {
      include: ['uno2']
    });
    if (!uno1s) {
      throw boom.notFound('Uno1 no encontrado');
    }
    return uno1s;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async update(id, cambios) {
    const uno1 = await this.findOne(id);
    const resp = await uno1.update(cambios);

    // Recargar la instancia del original para obtener los datos actualizados
    await resp.reload();

    return resp;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async delete(id) {
    const uno1 = await this.findOne(id);
    await uno1.destroy();
    return { id };
  }
}

module.exports = Uno1Service;
