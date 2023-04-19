const faker = require('faker');
const { ArticuloSchema, } = require('./../db/models/articulo.model');
const { CategoriaSchema, } = require('./../db/models/categoria.model');
const { AnimalSchema, } = require('./../db/models/animal.model');
const { EspecieSchema, } = require('./../db/models/especie.model');

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
      const elementoBody = req['body'] ? req['body'] : '';

      // Función que busca todos los objetos anidados
      const buscarObjetoAnidado = (objetoPrincipal) => {
        let objetosAnidadosEncontrados = {};

        for (const key in objetoPrincipal) {
          if (typeof objetoPrincipal[key] === 'object') {
            // ahora para cada elemento anidado le pego un uuid generado desde faker,
            // para su elemento id si es de tipo UUID
            const nombreSchema =  key.charAt(0).toUpperCase() + key.slice(1) + "Schema";
            if (eval(nombreSchema).id.type.key == 'UUID')
              objetoPrincipal[key].id = faker.datatype.uuid();

            // agrego el elemento anidado
            objetosAnidadosEncontrados[key] = objetoPrincipal[key];
          }
        }
        return objetosAnidadosEncontrados;
      };

      // Obtenemos el nombre de la función constructora del prototipo padre
      // y obtenemos el nombre solo del elemento que se esta usando
      const nombreElemento = Object.getPrototypeOf(servicio).constructor.name
        .slice(0, Object.getPrototypeOf(servicio).constructor.name.indexOf('Service'));

      // Obtener el objeto anidado
      let elementosAnidados = buscarObjetoAnidado(elementoBody);
      const nombreSchema = nombreElemento + "Schema";

      // le pego al elemento padre un uuid generado desde faker
      // para su elemento id si es de tipo UUID
      if (eval(nombreSchema).id.type.key == 'UUID')
        elementoBody.id = faker.datatype.uuid();

      // este es el resultado final de cualquier accion
      let resultadoFinal;

      // si existen elementos en body y en params, entonces mando los dos parametros en la funcion dinamica
      if (elementoBody && id)
        resultadoFinal = await servicio[funcion](id, elementoBody, next); // para update
      else if (elementoBody)// si existe el elemento en el body, entonces mando solo el parametro de body en la funcion dinamica
        resultadoFinal = await servicio[funcion](elementoBody, next); //para create
      else // si existe el elemento en params, entonces mando solo el parametro de params en la funcion dinamica
        resultadoFinal = await servicio[funcion](id, next); // para delete

      res.status(statusCode).json({
        message: mensaje,
        [nombreElemento.toLowerCase()]: resultadoFinal
      })
    } catch (error) {
      next(error);
    }
  }
}


module.exports = { requestHandlerGet, requestHandlerGetOne, requestHandlerAction }
