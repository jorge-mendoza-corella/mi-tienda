const faker = require('faker');
const boom = require('@hapi/boom');
const resultFromQuery = require('../utilities/acciones.db');
const { models } = require('../libs/sequelize');

class UserService {


  static _usersServiceInstance = null;

  static getInstance() {
    if (UserService._usersServiceInstance === null) {
      UserService._usersServiceInstance = new UserService();
    }
    return UserService._usersServiceInstance;
  }


  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async create(data) {
    const nuevaUser = await models.User.create(data);
    return nuevaUser;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM) O POR UNA CONSULTA DIRECTA CONECTADO POR POOL
  async find(next) {
    const users = await models.User.findAll();
    // const query = 'SELECT * FROM UserS where c=1';
    // const Users = await resultFromQuery(this.pool, query, null, true, next);

    return users;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User no encontrado');
    }
    return user;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async update(id, cambios) {
    const user = await this.findOne(id);
    const resp = await user.update(cambios);

    // Recargar la instancia del original para obtener los datos actualizados
    await resp.reload();

    return resp;
  }

  // ESTO LO HAGO CON SERIALIZACION (ORM)
  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }
}

module.exports = UserService;
