const { Articulo, ArticuloSchema } = require('./articulo.model');
const { Categoria, CategoriaSchema } = require('./categoria.model');
const { Animal, AnimalSchema } = require('./animal.model');
const { Especie, EspecieSchema } = require('./especie.model');
const { Ropa, RopaSchema } = require('./ropa.model');
const { TipoRopa, TipoRopaSchema } = require('./tipoRopa.model');


function setupModels(sequelize) {
  //Las tablas
  Articulo.init(ArticuloSchema, Articulo.config(sequelize));
  Categoria.init(CategoriaSchema, Categoria.config(sequelize));
  Animal.init(AnimalSchema, Animal.config(sequelize));
  Especie.init(EspecieSchema, Especie.config(sequelize));
  Ropa.init(RopaSchema, Ropa.config(sequelize));
  TipoRopa.init(TipoRopaSchema, TipoRopa.config(sequelize));

  //Las asociaciones de las tablas
  Articulo.associate(sequelize.models);
  Categoria.associate(sequelize.models);
  Ropa.associate(sequelize.models);
  TipoRopa.associate(sequelize.models);
  Animal.associate(sequelize.models);
  Especie.associate(sequelize.models);
}


module.exports = {setupModels};
