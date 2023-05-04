const Joi = require('joi');


const id = Joi.number().integer();
const nombre = Joi.string().min(5).max(30);
const precio = Joi.number().min(10.00);
const imagen = Joi.string().uri({ scheme: ['http', 'https'] }).regex(/\.(jpg|jpeg|png|gif)$/i);
const uno2Id = Joi.number().integer();
const uno2Nombre = Joi.string().min(5).max(30);
const dimencion = Joi.number().min(10.00);

const createUno1Schema = Joi.object({
  nombre: nombre.required(),
  precio: precio.required(),
  imagen: imagen.optional(),
  //uno2Id: uno2Id.required()
  uno2: Joi.object({
    nombre: uno2Nombre.required(),
    dimencion: dimencion.required()
  })
});

const updateUno1Schema = Joi.object({
  nombre: nombre,
  precio: precio,
  imagen: imagen,
  uno2Id: uno2Id
});

const getUno1Schema = Joi.object({
  id: id.required()
});


module.exports = {createUno1Schema, updateUno1Schema, getUno1Schema}
