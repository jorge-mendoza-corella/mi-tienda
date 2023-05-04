const { Model, DataTypes, Sequelize } = require('sequelize');

const UNO2_TABLE = 'uno2s';

const Uno2Schema = {
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
  dimencion: {
    allowNull: false,
    field: 'dimencion_volumen',
    type: DataTypes.DOUBLE
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Uno2 extends Model {
  static associate(models) {
    this.hasOne(models.Uno1, {
      as: 'uno1',
      foreignKey: 'uno2Id'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: UNO2_TABLE,
      modelName: 'Uno2',
      timestamps: false
    }
  }
}

module.exports = { UNO2_TABLE, Uno2Schema, Uno2 };
