const Joi = require('joi');


const id = Joi.number().integer();
const nombre = Joi.string().min(5).max(30);
const descripcion = Joi.string().min(10);

const createEspecieSchema = Joi.object({
  nombre: nombre.required(),
  descripcion: descripcion.required()
});

const updateEspecieSchema = Joi.object({
  nombre: nombre,
  descripcion: descripcion
});

const getEspecieSchema = Joi.object({
  id: id.required()
});


module.exports = {createEspecieSchema, updateEspecieSchema, getEspecieSchema}
