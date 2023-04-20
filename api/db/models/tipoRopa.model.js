const { Model, DataTypes, Sequelize } = require('sequelize');

const TIPO_ROPA_TABLE = 'tipos_ropa';

const TipoRopaSchema = {
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

class TipoRopa extends Model {
  static associate(models) {
    this.hasMany(models.Ropa, {
      as: 'ropa',
      foreignKey: 'tipoRopaId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: TIPO_ROPA_TABLE,
      modelName: 'TipoRopa',
      timestamps: false
    }
  }
}

module.exports = { TIPO_ROPA_TABLE, TipoRopaSchema, TipoRopa };
