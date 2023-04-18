const { Model, DataTypes, Sequelize } = require('sequelize');
const { ESPECIE_TABLE } = require('./especie.model');

const ANIMAL_TABLE = 'animales';

const AnimalSchema = {
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
  numeroPatas: {
    allowNull: false,
    field: 'numero_patas',
    type: DataTypes.INTEGER
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
  especieId: {
    field: 'especie_id',
    allowNull: false,
    unique: false,
    type: DataTypes.INTEGER,
    references: {
      model: ESPECIE_TABLE,
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

class Animal extends Model {

  static associate(models) {
    this.belongsTo(models.Especie, { as: 'especie' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ANIMAL_TABLE,
      modelName: 'Animal',
      timestamps: false
    }
  }
}

module.exports = { ANIMAL_TABLE, AnimalSchema, Animal };
