const {Sequelize} = require('sequelize');
const { config } = require('./../config/config');
const { setupModels } = require('./../db/models');


const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI,{
  dialect: 'postgres',
  underscored: true, // Habilitar la opción de carga ansiosa
  logging: false,
});

setupModels(sequelize);
//sequelize.sync();

module.exports = sequelize;
