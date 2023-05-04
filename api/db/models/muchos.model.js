const { Model, DataTypes, Sequelize } = require('sequelize');
const { UNO_TABLE } = require('./uno.model');

const MUCHOS_TABLE = 'muchos';

const MuchosSchema = {
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
  imagen: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  color: {
    allowNull: false,
    type: DataTypes.TEXT,
    defaultValue: 'blanco'
  },
  unoId: {
    field: 'uno_id',
    allowNull: false,
    unique: false,
    type: DataTypes.INTEGER,
    references: {
      model: UNO_TABLE,
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

class Muchos extends Model {

  static associate(models) {
    this.belongsTo(models.Uno, { as: 'uno' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MUCHOS_TABLE,
      modelName: 'Muchos',
      timestamps: false
    }
  }
}

module.exports = { MUCHOS_TABLE, MuchosSchema, Muchos };
