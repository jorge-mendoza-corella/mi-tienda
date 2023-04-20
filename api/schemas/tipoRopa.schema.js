const Joi = require('joi');


const id = Joi.number().integer();
const nombre = Joi.string().min(5).max(30);


const createTipoRopaSchema = Joi.object({
  nombre: nombre.required()
});

const updateTipoRopaSchema = Joi.object({
  nombre: nombre
});

const getTipoRopaSchema = Joi.object({
  id: id.required()
});


module.exports = {createTipoRopaSchema, updateTipoRopaSchema, getTipoRopaSchema}
