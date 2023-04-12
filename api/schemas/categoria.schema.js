const Joi = require('joi');


const id = Joi.string().uuid();
const nombre = Joi.string().min(5).max(30);
const dimencion = Joi.number().min(10.00);


const createCategoriaSchema = Joi.object({
  nombre: nombre.required(),
  dimencion: dimencion.required()
});

const updateCategoriaSchema = Joi.object({
  nombre: nombre,
  dimencion: dimencion
});

const getCategoriaSchema = Joi.object({
  id: id.required()
});


module.exports = {createCategoriaSchema, updateCategoriaSchema, getCategoriaSchema}
