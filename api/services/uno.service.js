const faker = require('faker');
const boom = require('@hapi/boom');
const resultFromQuery = require('../utilities/acciones.db');
const { models } = require('../libs/sequelize');

class UnoService {


  static _unosServiceInstance = null;

  static getInstance() {
    if (UnoService._unosServiceInstance === null) {
      UnoService._unosServiceInstance = new UnoService();
    }
    return UnoService._unosServiceInstance;
  }


  constructor() {
    this.unos = [];
  }

  generate() {
    const limit = 100;
    // usamos el faker
    for (let i = 0; i < limit; i++) {
      this.unos.push({
        id: faker.datatype.uuid(),
        nombre: faker.commerce.product(),
        imagen: faker.image.image()
      });
    }
  }

  async create(data) {
    const nuevaUno = await models.Uno.create(data);
    return nuevaUno;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM) O CON UNA CONSULTA DIRECTA CONECTANDO POR POOL
  async find(next) {
    const uno = await models.Uno.findAll({
      include: ['muchos']
    });
    // const query = 'SELECT * FROM Unos where c=1';
    // const Unos = await resultFromQuery(this.pool, query, null, true, next);

    return uno;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async findOne(id) {
    const uno = await models.Uno.findByPk(id, {
      include: ['muchos']
    });
    if (!uno) {
      throw boom.notFound('Uno no encontrado');
    }
    return uno;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async update(id, cambios) {
    const unos = await this.findOne(id);
    const resp = await unos.update(cambios);

    // Recargar la instancia del original para obtener los datos actualizados
    await resp.reload();

    return resp;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async delete(id) {
    const unos = await this.findOne(id);
    await unos.destroy();
    return { id };
  }
}

module.exports = UnoService;
