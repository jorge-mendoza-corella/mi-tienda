'use strict';
const {ROPA_TABLE, RopaSchema,} = require('../models/ropa.model')
const {TIPO_ROPA_TABLE, TipoRopaSchema,} = require('../models/tipoRopa.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(TIPO_ROPA_TABLE,TipoRopaSchema);
    await queryInterface.createTable(ROPA_TABLE,RopaSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ROPA_TABLE);
    await queryInterface.dropTable(TIPO_ROPA_TABLE);
  }
};
