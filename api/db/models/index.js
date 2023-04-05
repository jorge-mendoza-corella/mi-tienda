const { Articulo, ArticuloSchema } = require('./articulo.model');

function setupModels(sequelize) {
  Articulo.init(ArticuloSchema, Articulo.config(sequelize));
}


module.exports = {setupModels};
