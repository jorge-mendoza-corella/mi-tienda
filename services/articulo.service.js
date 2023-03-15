const faker = require('faker');
const boom = require('@hapi/boom');

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
    const articulo = this.articulos.find(item => item.id === id);
    if (!articulo) {
      throw boom.notFound('Articulo no encontrado');
    }
    return articulo;
  }

  async update(id, cambios) {
    const index = this.articulos.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('Articulo no encontrado');
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
      throw boom.notFound('Articulo no encontrado');
    }
    this.articulos.splice(index, 1);
    return { id }
  }


}

module.exports = ArticuloService;
