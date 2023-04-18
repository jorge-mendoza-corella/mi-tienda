const Joi = require('joi');


const id = Joi.number().integer();
const nombre = Joi.string().min(5).max(30);
const numeroPatas = Joi.number().integer().min(2);
const imagen = Joi.string().uri({ scheme: ['http', 'https'] }).regex(/\.(jpg|jpeg|png|gif)$/i);
const especieId = Joi.number().integer();
const color = Joi.string().min(5);

const createAnimalSchema = Joi.object({
  nombre: nombre.required(),
  numeroPatas: numeroPatas.required(),
  imagen: imagen.optional(),
  especieId: especieId.required(),
  color: color.required()
});

const updateAnimalSchema = Joi.object({
  nombre: nombre,
  numeroPatas: numeroPatas,
  imagen: imagen,
  especieId: especieId,
  color: color
});

const getAnimalSchema = Joi.object({
  id: id.required()
});


module.exports = {createAnimalSchema, updateAnimalSchema, getAnimalSchema}
