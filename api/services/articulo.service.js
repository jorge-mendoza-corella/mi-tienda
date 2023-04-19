const faker = require('faker');
const boom = require('@hapi/boom');
const resultFromQuery = require('../utilities/acciones.db');
const { models } = require('../libs/sequelize');

class ArticuloService {


  static _articulosServiceInstance = null;

  static getInstance() {
    if (ArticuloService._articulosServiceInstance === null) {
      ArticuloService._articulosServiceInstance = new ArticuloService();
    }
    return ArticuloService._articulosServiceInstance;
  }


  constructor() {
    this.articulos = [];
  }

  generate() {
    const limit = 100;
    // usamos el faker
    for (let i = 0; i < limit; i++) {
      this.articulos.push({
        id: faker.datatype.uuid(),
        nombre: faker.commerce.product(),
        imagen: faker.image.image()
      });
    }
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async create(data) {
    const nuevaArticulo = await models.Articulo.create(data, {
      include: ['categoria']
    });
    return nuevaArticulo;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM) O POR UNA CONSULTA DIRECTA CONECTADO POR POOL
  async find(next) {
    const articulos = await models.Articulo.findAll({
      include: ['categoria']
    });
    // const query = 'SELECT * FROM ARTICULOS where c=1';
    // const articulos = await resultFromQuery(this.pool, query, null, true, next);

    return articulos;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async findOne(id) {
    const articulos = await models.Articulo.findByPk(id, {
      include: ['categoria']
    });
    if (!articulos) {
      throw boom.notFound('Articulo no encontrado');
    }
    return articulos;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async update(id, cambios) {
    const articulo = await this.findOne(id);
    const resp = await articulo.update(cambios);

    // Recargar la instancia del original para obtener los datos actualizados
    await resp.reload();

    return resp;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async delete(id) {
    const articulo = await this.findOne(id);
    await articulo.destroy();
    return { id };
  }
}

module.exports = ArticuloService;
