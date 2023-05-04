'use strict';
const {MUCHOS_TABLE, MuchosSchema,} = require('../models/muchos.model')
const {UNO_TABLE, UnoSchema,} = require('../models/uno.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(UNO_TABLE,UnoSchema);
    await queryInterface.createTable(MUCHOS_TABLE,MuchosSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(MUCHOS_TABLE);
    await queryInterface.dropTable(UNO_TABLE);
  }
};
