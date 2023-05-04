const { Model, DataTypes, Sequelize } = require('sequelize');

const UNO_TABLE = 'unos';

const UnoSchema = {
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
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Uno extends Model {
  static associate(models) {
    this.hasMany(models.Muchos, {
      as: 'muchos',
      foreignKey: 'unoId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: UNO_TABLE,
      modelName: 'Uno',
      timestamps: false
    }
  }
}

module.exports = { UNO_TABLE, UnoSchema, Uno };
