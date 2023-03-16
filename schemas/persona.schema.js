const Joi = require('joi');


const id = Joi.string().uuid();
const nombre = Joi.string().min(5).max(30);
const email = Joi.string().email();


const createPersonaSchema = Joi.object({
  nombre: nombre.required(),
  imagen: email.required()
});

const updatePersonaSchema = Joi.object({
  nombre: nombre,
  imagen: email
});

const getPersonaSchema = Joi.object({
  id: id.required()
});


module.exports = {createPersonaSchema, updatePersonaSchema, getPersonaSchema}
