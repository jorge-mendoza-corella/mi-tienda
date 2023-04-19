const faker = require('faker');
const boom = require('@hapi/boom');
const resultFromQuery = require('../utilities/acciones.db');
const { models } = require('../libs/sequelize');

class CategoriaService {


  static _categoriasServiceInstance = null;

  static getInstance() {
    if (CategoriaService._categoriasServiceInstance === null) {
      CategoriaService._categoriasServiceInstance = new CategoriaService();
    }
    return CategoriaService._categoriasServiceInstance;
  }


  constructor() {
    this.categorias = [];
  }

  generate() {
    const limit = 100;
    // usamos el faker
    for (let i = 0; i < limit; i++) {
      this.categorias.push({
        id: faker.datatype.uuid(),
        nombre: faker.commerce.product(),
        imagen: faker.image.image()
      });
    }
  }

  async create(data) {
    const nuevaCategoria = await models.Categoria.create(data);
    return nuevaCategoria;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM) O CON UNA CONSULTA DIRECTA CONECTANDO POR POOL
  async find(next) {
    const categorias = await models.Categoria.findAll({
      include: ['articulo']
    });
    // const query = 'SELECT * FROM categorias where c=1';
    // const categorias = await resultFromQuery(this.pool, query, null, true, next);

    return categorias;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async findOne(id) {
    const categorias = await models.Categoria.findByPk(id, {
      include: ['articulo']
    });
    if (!categorias) {
      throw boom.notFound('Categoria no encontrado');
    }
    return categorias;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async update(id, cambios) {
    const categorias = await this.findOne(id);
    const resp = await categorias.update(cambios);

    // Recargar la instancia del original para obtener los datos actualizados
    await resp.reload();

    return resp;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async delete(id) {
    const categorias = await this.findOne(id);
    await categorias.destroy();
    return { id };
  }
}

module.exports = CategoriaService;
