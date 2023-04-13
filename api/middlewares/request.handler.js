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


function requestHandlerGetOne(servicio, funcion, statusCode) {
  return async (req, res, next) => {
    try {
      const { id } = req['params'];
      const elemento = await servicio[funcion](id, next);
      res.status(statusCode).json(elemento);
    } catch (error) {
      next(error);
    }
  }
}


function requestHandlerAction(servicio, funcion, statusCode, mensaje) {
  return async (req, res, next) => {
    try {
      // busco en el params y en el body del request, si existen los elementos, asigno el valor desde el req, y si no solo ''
      const { id } = req['params'] ? req['params'] : '';
      const elemento = req['body'] ? req['body'] : '';
      console.log('ID ' + id);
      console.log('elemento ' + JSON.stringify(elemento));

      // Función que busca el objeto anidado
      const buscarObjetoAnidado = (objeto) => {
        let objetoAnidadoEncontrado = null;
        Object.values(objeto).find(valor => {
          if (typeof valor === 'object' && valor !== null) {
            objetoAnidadoEncontrado = valor;
            return true;
          }
          return false;
        });
        return objetoAnidadoEncontrado;
      };

      // Obtener el objeto anidado
      let elementoAnidado = buscarObjetoAnidado(elemento);

      // le pego al elemento un uuid generado desde faker
      //console.log(elemento);
      elemento.id = faker.datatype.uuid();

      // le pego al elemento anidado un uuid generado desde faker, para su elemento id
      //console.log(elementoAnidado);
      elementoAnidado ? elementoAnidado.id = faker.datatype.uuid() : undefined;


      // este es el resultado final de cualquier accion
      let resultadoFinal;

      // si existen elementos en body y en params, entonces mando los dos parametros en la funcion dinamica
      if (elemento && id)
        resultadoFinal = await servicio[funcion](id, elemento, next); // para update
      else if (elemento)// si existe el elemento en el body, entonces mando solo el parametro de body en la funcion dinamica
        resultadoFinal = await servicio[funcion](elemento, next); //para create
      else // si existe el elemento en params, entonces mando solo el parametro de params en la funcion dinamica
        resultadoFinal = await servicio[funcion](id, next); // para delete

      res.status(statusCode).json({
        message: mensaje,
        elemento: resultadoFinal
      })
    } catch (error) {
      next(error);
    }
  }
}


module.exports = { requestHandlerGet, requestHandlerGetOne, requestHandlerAction }
