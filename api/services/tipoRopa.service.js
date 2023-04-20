const faker = require('faker');
const boom = require('@hapi/boom');
const resultFromQuery = require('../utilities/acciones.db');
const { models } = require('../libs/sequelize');

class TipoRopaService {


  static _tipoRopasServiceInstance = null;

  static getInstance() {
    if (TipoRopaService._tipoRopasServiceInstance === null) {
      TipoRopaService._tipoRopasServiceInstance = new TipoRopaService();
    }
    return TipoRopaService._tipoRopasServiceInstance;
  }


  constructor() {
    this.tipoRopas = [];
  }

  generate() {
    const limit = 100;
    // usamos el faker
    for (let i = 0; i < limit; i++) {
      this.tipoRopas.push({
        id: faker.datatype.uuid(),
        nombre: faker.commerce.product(),
        imagen: faker.image.image()
      });
    }
  }

  async create(data) {
    const nuevaTipoRopa = await models.TipoRopa.create(data);
    return nuevaTipoRopa;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM) O CON UNA CONSULTA DIRECTA CONECTANDO POR POOL
  async find(next) {
    const tiposRopa = await models.TipoRopa.findAll({
      include: ['ropa']
    });
    // const query = 'SELECT * FROM TipoRopas where c=1';
    // const TipoRopas = await resultFromQuery(this.pool, query, null, true, next);

    return tiposRopa;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async findOne(id) {
    const tiposRopa = await models.TipoRopa.findByPk(id, {
      include: ['ropa']
    });
    if (!tiposRopa) {
      throw boom.notFound('Tipo ropa no encontrado');
    }
    return tiposRopa;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async update(id, cambios) {
    const tipoRopas = await this.findOne(id);
    const resp = await tipoRopas.update(cambios);

    // Recargar la instancia del original para obtener los datos actualizados
    await resp.reload();

    return resp;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async delete(id) {
    const tipoRopas = await this.findOne(id);
    await tipoRopas.destroy();
    return { id };
  }
}

module.exports = TipoRopaService;
