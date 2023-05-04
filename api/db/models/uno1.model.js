const { Model, DataTypes, Sequelize } = require('sequelize');
const { UNO2_TABLE } = require('./uno2.model');

const UNO1_TABLE = 'uno1s';

const Uno1Schema = {
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
  precio: {
    allowNull: false,
    type: DataTypes.DOUBLE
  },
  imagen: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  peso: {
    allowNull: false,
    type: DataTypes.DOUBLE,
    defaultValue: 0
  },
  uno2Id: {
    field: 'uno2_id',
    allowNull: false,
    unique: true,
    type: DataTypes.INTEGER,
    references: {
      model: UNO2_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Uno1 extends Model {

  static associate(models) {
    this.belongsTo(models.Uno2, { as: 'uno2' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: UNO1_TABLE,
      modelName: 'Uno1',
      timestamps: false
    }
  }
}

module.exports = { UNO1_TABLE, Uno1Schema, Uno1 };
