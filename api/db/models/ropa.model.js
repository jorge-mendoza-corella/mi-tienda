const { Model, DataTypes, Sequelize } = require('sequelize');
const { TIPO_ROPA_TABLE } = require('./tipoRopa.model');

const ROPA_TABLE = 'ropas';

const RopaSchema = {
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
  tipoRopaId: {
    field: 'tipo_ropa_id',
    allowNull: false,
    unique: false,
    type: DataTypes.INTEGER,
    references: {
      model: TIPO_ROPA_TABLE,
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

class Ropa extends Model {

  static associate(models) {
    this.belongsTo(models.TipoRopa, { as: 'tipoRopa' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ROPA_TABLE,
      modelName: 'Ropa',
      timestamps: false
    }
  }
}

module.exports = { ROPA_TABLE, RopaSchema, Ropa };
