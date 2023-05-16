const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(5).max(30);
const email = Joi.string().email();
const password = Joi.string();

const createUserSchema = Joi.object({
  nombre: nombre.required(),
  email: email.required(),
  password: password.required()
});

const updateUserSchema = Joi.object({
  nombre: nombre,
  email: email,
  password: password
});

const getUserSchema = Joi.object({
  id: id.required()
});


module.exports = {createUserSchema, updateUserSchema, getUserSchema}
