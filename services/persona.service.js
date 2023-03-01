const faker = require('faker');

class PersonaService {

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

  create() {

  }

  find() {
    return this.personas;
  }

  findOne(id) {
    return this.personas.find(item => item.id === id);
  }

  update() {

  }

  delete() {
this.personas
  }


}

module.exports = PersonaService;
