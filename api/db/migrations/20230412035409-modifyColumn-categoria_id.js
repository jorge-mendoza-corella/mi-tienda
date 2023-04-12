'use strict';
const { ARTICULO_TABLE} = require('../models/articulo.model');
const { DataTypes } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(ARTICULO_TABLE, 'categoria_id', {
      field: 'categoria_id',
      allowNull: false,
      unique: true,
      type: DataTypes.UUID
    });
  },

  async down(queryInterface) {
    // nada
  }
};
