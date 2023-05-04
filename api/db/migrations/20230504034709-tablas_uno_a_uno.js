'use strict';
const {UNO1_TABLE, Uno1Schema,} = require('../models/uno1.model')
const {UNO2_TABLE, Uno2Schema,} = require('../models/uno2.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(UNO2_TABLE,Uno2Schema);
    await queryInterface.createTable(UNO1_TABLE,Uno1Schema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(UNO1_TABLE);
    await queryInterface.dropTable(UNO2_TABLE);
  }
};
