const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(5).max(30);
const imagen = Joi.string().uri({ scheme: ['http', 'https'] }).regex(/\.(jpg|jpeg|png|gif)$/i);
const color = Joi.string().min(5);
const tipoRopaId = Joi.number().integer();

const createRopaSchema = Joi.object({
  nombre: nombre.required(),
  imagen: imagen.optional(),
  color: color.required(),
  tipoRopaId: tipoRopaId.required()
});

const updateRopaSchema = Joi.object({
  nombre: nombre,
  imagen: imagen,
  color: color,
  tipoRopaId: tipoRopaId
});

const getRopaSchema = Joi.object({
  id: id.required()
});


module.exports = {createRopaSchema, updateRopaSchema, getRopaSchema}
