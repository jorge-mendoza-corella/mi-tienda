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

  async create(data) {
    const nuevaArticulo = await models.Articulo.create(data);
    return nuevaArticulo;
  }

  // ESTO LO HAGO CON LA CONEXION AL POOL Y LUEGO CON UNA CONSULTA DIRECTA
  /*   async find(next) {
      const query = 'SELECT * FROM ARTICULOS';
      const articulos = await resultFromQuery(this.pool, query, null, true, next);
      return articulos;
    }

   async findOne(id, next) {
    const query = 'SELECT * FROM ARTICULOS WHERE ID = $1';
    const articulo = await resultFromQuery(this.pool, query, id, true, next);
    return articulo[0];
  }
    */

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async find(next) {
  //  const articulos = await models.Articulo.findAll();



    const query = 'SELECT * FROM ARTICULOS where c=1';
    const articulos = await resultFromQuery(this.pool, query, null, true, next);

    return articulos;
  }

  async findOne(id) {
    const articulos = await models.Articulo.findByPk(id);
    if (!articulos) {
      throw boom.notFound('Articulo no encontrado');
    }
    return articulos;
  }

  async update(id, cambios) {
    const articulo = await this.findOne(id);
    const resp = await articulo.update(cambios);
    return resp;
  }

  async delete(id) {
    const articulo = await this.findOne(id);
    await articulo.destroy();
    return { id };
  }
}

module.exports = ArticuloService;
