'use strict';
const {ARTICULO_TABLE, ArticuloSchema,} = require('../models/articulo.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ARTICULO_TABLE,ArticuloSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ARTICULO_TABLE);
  }
};
