const faker = require('faker');
const boom = require('@hapi/boom');
const resultFromQuery = require('../utilities/acciones.db');
const { models } = require('../libs/sequelize');

class AnimalService {


  static _animalsServiceInstance = null;

  static getInstance() {
    if (AnimalService._animalsServiceInstance === null) {
      AnimalService._animalsServiceInstance = new AnimalService();
    }
    return AnimalService._animalsServiceInstance;
  }


  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async create(data) {
    const nuevaanimal = await models.Animal.create(data);
    return nuevaanimal;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM) O POR UNA CONSULTA DIRECTA CONECTADO POR POOL
  async find(next) {
    const animals = await models.Animal.findAll({
      include: ['especie']
    });
    // const query = 'SELECT * FROM animalS where c=1';
    // const animals = await resultFromQuery(this.pool, query, null, true, next);

    return animals;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async findOne(id) {
    const animals = await models.Animal.findByPk(id, {
      include: ['especie']
    });
    if (!animals) {
      throw boom.notFound('animal no encontrado');
    }
    return animals;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async update(id, cambios) {
    const animal = await this.findOne(id);
    const resp = await animal.update(cambios);
    return resp;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async delete(id) {
    const animal = await this.findOne(id);
    await animal.destroy();
    return { id };
  }
}

module.exports = AnimalService;
