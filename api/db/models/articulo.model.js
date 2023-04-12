const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORIA_TABLE } = require('./categoria.model');

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
  imagen: {
    allowNull: true,
    type: DataTypes.TEXT
  },
  peso: {
    allowNull: false,
    type: DataTypes.DOUBLE,
    defaultValue: 0
  },
  categoriaId: {
    field: 'categoria_id',
    allowNull: false,
    unique: true,
    type: DataTypes.UUID,
    references: {
      model: CATEGORIA_TABLE,
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

class Articulo extends Model {

  static associate(models) {
    this.belongsTo(models.Categoria, { as: 'categoria' });
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
