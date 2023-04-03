const faker = require('faker');
const boom = require('@hapi/boom');
const conexion = require('../libs/postgress.connection');

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
    this.generate();
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

  async find() {
    const client = await conexion();
    try {
      const personas = await client.query('SELECT * FROM PERSONAS');
    } catch (error) {

    }

    return personas.rows;
  }

  async findOne(id) {

    const client = await conexion();
    try {
      const persona = await client.query('SELECT * FROM PERSONAS WHERE ID = $1', [id]);

      if (persona.rowCount == 0) {
        throw boom.notFound('Persona no encontrada');
      }
    } catch (error) {
      throw errorDB.errorDBHandler(error, next);
    }

    return persona;

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
