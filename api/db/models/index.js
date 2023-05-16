const { Articulo, ArticuloSchema } = require('./articulo.model');
const { Categoria, CategoriaSchema } = require('./categoria.model');
const { Animal, AnimalSchema } = require('./animal.model');
const { Especie, EspecieSchema } = require('./especie.model');
const { Ropa, RopaSchema } = require('./ropa.model');
const { TipoRopa, TipoRopaSchema } = require('./tipoRopa.model');
const { Uno1, Uno1Schema } = require('./uno1.model');
const { Uno2, Uno2Schema } = require('./uno2.model');
const { Uno, UnoSchema } = require('./uno.model');
const { Muchos, MuchosSchema } = require('./muchos.model');
const { User, UserSchema } = require('./user.model');

function setupModels(sequelize) {
  //Las tablas
  Articulo.init(ArticuloSchema, Articulo.config(sequelize));
  Categoria.init(CategoriaSchema, Categoria.config(sequelize));
  Animal.init(AnimalSchema, Animal.config(sequelize));
  Especie.init(EspecieSchema, Especie.config(sequelize));
  Ropa.init(RopaSchema, Ropa.config(sequelize));
  TipoRopa.init(TipoRopaSchema, TipoRopa.config(sequelize));
  Uno1.init(Uno1Schema, Uno1.config(sequelize));
  Uno2.init(Uno2Schema, Uno2.config(sequelize));
  Uno.init(UnoSchema, Uno.config(sequelize));
  Muchos.init(MuchosSchema, Muchos.config(sequelize));
  User.init(UserSchema, User.config(sequelize));

  //Las asociaciones de las tablas
  Articulo.associate(sequelize.models);
  Categoria.associate(sequelize.models);
  Ropa.associate(sequelize.models);
  TipoRopa.associate(sequelize.models);
  Animal.associate(sequelize.models);
  Especie.associate(sequelize.models);
  Uno1.associate(sequelize.models);
  Uno2.associate(sequelize.models);
  Uno.associate(sequelize.models);
  Muchos.associate(sequelize.models);
}


module.exports = {setupModels};
