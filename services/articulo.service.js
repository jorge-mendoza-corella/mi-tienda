const faker = require('faker');

class ArticuloService {

  constructor() {
    this.articulos = [];
    this.generate();
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
    const nuevaArticulo = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.articulos.push(nuevaArticulo);
    return nuevaArticulo;
  }

  async find() {
    return this.articulos;
  }

  async findOne(id) {
    return this.articulos.find(item => item.id === id);
  }

  async update(id, cambios) {
    const index = this.articulos.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Hubo un error');
    }
    const articulo = this.articulos[index];
    this.articulos[index] =
    {
      ...articulo,
      ...cambios
    }

    return this.articulos[index];
  }

  async delete(id) {
    const index = this.articulos.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Hubo un error');
    }
    this.articulos.splice(index, 1);
    return { id }
  }


}

module.exports = ArticuloService;
