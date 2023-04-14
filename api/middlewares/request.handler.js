const faker = require('faker');
const {ArticuloSchema,} = require('./../db/models/articulo.model');
const {CategoriaSchema,} = require('./../db/models/categoria.model');

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
      const buscarObjetoAnidado = (objeto) => {
        let objetosAnidadosEncontrados = [];
        Object.values(objeto).forEach(valor => {
          if (typeof valor === 'object' && valor !== null) {
            objetosAnidadosEncontrados.push(valor);
          }
        });
        return objetosAnidadosEncontrados;
      };

      // Obtenemos el nombre de la función constructora del prototipo
      // y obtenemos el nombre solo del elemento que se esta usando
      const nombreElemento = Object.getPrototypeOf(servicio).constructor.name
        .slice(0, Object.getPrototypeOf(servicio).constructor.name.indexOf('Service'));

      // Obtener el objeto anidado
      let elementosAnidados = buscarObjetoAnidado(elementoBody);

      // le pego al elemento un uuid generado desde faker
      elementoBody.id = faker.datatype.uuid();

      // para todos los elementos anidados les pego un uuid generado desde faker,
      // para su elemento id si es de tipo UUID
      elementosAnidados.forEach(elemento => {
        const nombreSchema = nombreElemento + "Schema";
        if (eval(nombreSchema).id.type.key == 'UUID')
          elemento.id = faker.datatype.uuid();
      });

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
