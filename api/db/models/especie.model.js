const { Model, DataTypes, Sequelize } = require('sequelize');

const ESPECIE_TABLE = 'especies';

const EspecieSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre: {
    allowNull: false,
    unique: true,
    type: DataTypes.TEXT
  },
  descripcion: {
    allowNull: true,
    unique: false,
    type: DataTypes.TEXT
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Especie extends Model {

  static associate(models) {
    this.hasMany(models.Animal, {
      as: 'animales',
      foreignKey: 'especieId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ESPECIE_TABLE,
      modelName: 'Especie',
      timestamps: false
    }
  }
}

module.exports = { ESPECIE_TABLE, EspecieSchema, Especie };
