'use strict';
const {ARTICULO_TABLE, ArticuloSchema,} = require('../models/articulo.model')
const {CATEGORIA_TABLE, CategoriaSchema,} = require('../models/categoria.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORIA_TABLE,CategoriaSchema);
    await queryInterface.addColumn(ARTICULO_TABLE, 'categoria_id', ArticuloSchema.categoriaId);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CATEGORIA_TABLE);
    await queryInterface.removeColumn(ARTICULO_TABLE,'categoria_id');
  }
};
