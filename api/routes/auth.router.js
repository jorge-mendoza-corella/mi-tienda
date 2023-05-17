const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { config } = require('./../config/config');

// genero un router
const router = express.Router();

// hace login
router.post('/login',
  // middlewares
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role
      }
      const token = jwt.sign(payload, config.jwtSecret);
      delete user.dataValues.pa
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error)
    }
  }
);


module.exports = router;
