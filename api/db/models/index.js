const { Articulo, ArticuloSchema } = require('./articulo.model');
const { Categoria, CategoriaSchema } = require('./categoria.model');


function setupModels(sequelize) {
  //Las tablas
  Articulo.init(ArticuloSchema, Articulo.config(sequelize));
  Categoria.init(CategoriaSchema, Categoria.config(sequelize));

  //Las asociaciones de las tablas
  Articulo.associate(sequelize.models);
  Categoria.associate(sequelize.models);
}


module.exports = {setupModels};
