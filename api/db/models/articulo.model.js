const { Model, DataTypes, Sequelize } = require('sequelize');

const ARTICULO_TABLE = 'articulos';

const ArticuloSchema = {
  id: {
    allowNull: false,
    autoIncrement: false,
    primaryKey: true,
    type: DataTypes.UUID
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
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }
}

class Articulo extends Model {
  static associate() {
    //algo
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ARTICULO_TABLE,
      modelName: 'Articulo',
      timestamps: false
    }
  }
}

module.exports = { ARTICULO_TABLE, ArticuloSchema, Articulo };
