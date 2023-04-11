'use strict';
const { ARTICULO_TABLE, ArticuloSchema, } = require('../models/articulo.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(ARTICULO_TABLE, 'peso', ArticuloSchema.peso);
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(ARTICULO_TABLE,'peso');  }
};
