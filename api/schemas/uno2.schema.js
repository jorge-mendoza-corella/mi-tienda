const Joi = require('joi');


const id = Joi.number().integer();
const nombre = Joi.string().min(5).max(30);
const dimencion = Joi.number().min(10.00);


const createUno2Schema = Joi.object({
  nombre: nombre.required(),
  dimencion: dimencion.required()
});

const updateUno2Schema = Joi.object({
  nombre: nombre,
  dimencion: dimencion
});

const getUno2Schema = Joi.object({
  id: id.required()
});


module.exports = {createUno2Schema, updateUno2Schema, getUno2Schema}
