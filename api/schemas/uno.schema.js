const Joi = require('joi');


const id = Joi.number().integer();
const nombre = Joi.string().min(5).max(30);


const createUnoSchema = Joi.object({
  nombre: nombre.required()
});

const updateUnoSchema = Joi.object({
  nombre: nombre
});

const getUnoSchema = Joi.object({
  id: id.required()
});


module.exports = {createUnoSchema, updateUnoSchema, getUnoSchema}
