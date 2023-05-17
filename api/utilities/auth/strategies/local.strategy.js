const boom = require('@hapi/boom');
const { Strategy } = require('passport-local');
const UserService = require('./../../../services/user.service');
const bcrypt = require('bcrypt');

const service = new UserService();
const LocalStrategy = new Strategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      // busco en la BD el usuario por meio del email
      const user = await service.findByEmail(email)

      // si el usuario no existe no lo dejo pasar
      if (!user) {
        done(boom.unauthorized(), false);
      }

      // hago la comparacion del psw
      const isMatch = await bcrypt.compare(password, user.password);

      // si el psw no coincide, no lo dejo pasar
      if (!isMatch) {
        done(boom.unauthorized(), false);
      }

      delete user.dataValues.password;
      // si todo correcto mando el usuario
      done(null, user);

    } catch (error) {
      done(error, false)
    }

  });

module.exports = LocalStrategy;
