const ArticuloService = require('../services/articulo.service');
const PersonaService = require('../services/persona.service');
const faker = require('faker');

function requestHandlerGet(servicio, funcion) {
  return async (req, res, next) => {
    try {
      const elementos = await servicio[funcion](next);
      res.json(elementos);
    } catch (error) {
      next(error);
    }
  }
}


function requestHandlerGetOne(servicio, funcion, property, statusCode) {
  return async (req, res, next) => {
    try {
      const { id } = req[property];
      const elemento = await servicio[funcion](id, next);
      res.status(statusCode).json(elemento);
    } catch (error) {
      next(error);
    }
  }
}


function requestHandlerAction(servicio, funcion, property, statusCode, mensaje, next) {
  return async (req, res, next) => {
    try {
      const [body, params] = property.split(',');

      // si existen los elementos, asigno el valor desde el req, y si no solo ''
      const { id } = params ? req[params] : '';
      const elemento = body ? req[body] : '';

      // le pego al elemento un uuid generado desde faker
      elemento.id = faker.datatype.uuid();

      // este es el resultado final de cualquier accion
      let e;

      // si existen elementos body y params, entonces mando los dos parametros en la funcion dinamica
      if (body && params)
        e = await servicio[funcion](id, elemento, next); // para update
      else if (body)// si existe el elemento body, entonces mando solo el parametro de body en la funcion dinamica
        e = await servicio[funcion](elemento, next); //para create
      else // si existe el elemento params, entonces mando solo el parametro de params en la funcion dinamica
        e = await servicio[funcion](id, next); // para delete

      res.status(statusCode).json({
        message: mensaje,
        elemento: e
      })
    } catch (error) {
      next(error);
    }
  }
}


module.exports = { requestHandlerGet, requestHandlerGetOne, requestHandlerAction }
