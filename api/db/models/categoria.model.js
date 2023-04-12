const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORIA_TABLE = 'categorias';

const CategoriaSchema = {
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

class Categoria extends Model {
  static associate(models) {
    this.hasOne(models.Articulo, {
      as: 'articulo',
      foreignKey: 'categoriaId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORIA_TABLE,
      modelName: 'Categoria',
      timestamps: false
    }
  }
}

module.exports = { CATEGORIA_TABLE, CategoriaSchema, Categoria };
