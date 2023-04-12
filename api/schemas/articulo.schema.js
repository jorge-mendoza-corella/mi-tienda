const Joi = require('joi');


const id = Joi.string().uuid();
const nombre = Joi.string().min(5).max(30);
const precio = Joi.number().min(10.00);
const imagen = Joi.string().uri({ scheme: ['http', 'https'] }).regex(/\.(jpg|jpeg|png|gif)$/i);
const categoriaId = Joi.string().uuid();
const categoriaNombre = Joi.string().min(5).max(30);
const dimencion = Joi.number().min(10.00);

const createArticuloSchema = Joi.object({
  nombre: nombre.required(),
  precio: precio.required(),
  imagen: imagen.optional(),
  //categoriaId: categoriaId.required()
  categoria: Joi.object({
    nombre: categoriaNombre.required(),
    dimencion: dimencion.required()
  })
});

const updateArticuloSchema = Joi.object({
  nombre: nombre,
  precio: precio,
  imagen: imagen,
  categoriaId: categoriaId
});

const getArticuloSchema = Joi.object({
  id: id.required()
});


module.exports = {createArticuloSchema, updateArticuloSchema, getArticuloSchema}
