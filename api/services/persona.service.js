const faker = require('faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgress.pool');
const resultFromQuery = require('../utilities/acciones.db');

class PersonaService {

  static _personasServiceInstance = null;

  static getInstance() {
    if (PersonaService._personasServiceInstance === null) {
      PersonaService._personasServiceInstance = new PersonaService();
    }
    return PersonaService._personasServiceInstance;
  }

  constructor() {
    this.personas = [];
    //this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  generate() {
    const limit = 100;
    // usamos el faker
    for (let i = 0; i < limit; i++) {
      this.personas.push({
        id: faker.datatype.uuid(),
        nombre: faker.name.findName(),
        email: faker.internet.email()
      });
    }
  }

  async create(data) {
    const nuevaPersona = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.personas.push(nuevaPersona);
    return nuevaPersona;
  }

  async find(next) {
    const query = 'SELECT * FROM PERSONAS';
    const personas = await resultFromQuery(this.pool, query, null, true, next);
    return personas;
  }

  async findOne(id, next) {
    const query = 'SELECT * FROM PERSONAS WHERE ID = $1';
    const persona = await resultFromQuery(this.pool, query, id, true, next);
    return persona[0];
  }

  async update(id, cambios) {
    const index = this.personas.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Persona no encontrada');
    }
    const persona = this.personas[index];
    this.personas[index] =
    {
      ...persona,
      ...cambios
    }

    return this.personas[index];
  }

  async delete(id) {
    const index = this.personas.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Persona no encontrada');
    }
    this.personas.splice(index, 1);
    return { id }
  }


}

module.exports = PersonaService;
