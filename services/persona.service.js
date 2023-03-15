const faker = require('faker');

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
    return this.personas;
  }

  async findOne(id) {
    return this.personas.find(item => item.id === id);
  }

  async update(id, cambios) {
    const index = this.personas.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Hubo un error');
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
      throw new Error("Hubo un error");
    }
    this.personas.splice(index, 1);
    return { id }
  }


}

module.exports = PersonaService;
