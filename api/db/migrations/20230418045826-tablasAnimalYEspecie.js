'use strict';
const {ANIMAL_TABLE, AnimalSchema,} = require('../models/animal.model')
const {ESPECIE_TABLE, EspecieSchema,} = require('../models/especie.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ESPECIE_TABLE,EspecieSchema);
    await queryInterface.createTable(ANIMAL_TABLE,AnimalSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ANIMAL_TABLE);
    await queryInterface.dropTable(ESPECIE_TABLE);
  }
};
