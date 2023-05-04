const Joi = require('joi');

const id = Joi.number().integer();
const nombre = Joi.string().min(5).max(30);
const imagen = Joi.string().uri({ scheme: ['http', 'https'] }).regex(/\.(jpg|jpeg|png|gif)$/i);
const color = Joi.string().min(5);
const unoId = Joi.number().integer();

const createMuchosSchema = Joi.object({
  nombre: nombre.required(),
  imagen: imagen.optional(),
  color: color.required(),
  unoId: unoId.required()
});

const updateMuchosSchema = Joi.object({
  nombre: nombre,
  imagen: imagen,
  color: color,
  unoId: unoId
});

const getMuchosSchema = Joi.object({
  id: id.required()
});


module.exports = {createMuchosSchema, updateMuchosSchema, getMuchosSchema}
