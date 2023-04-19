const express = require('express');
const CategoriaService = require('../services/categoria.service');
const validatorHandler = require('../middlewares/validator.handler');
const { requestHandlerGet, requestHandlerGetOne, requestHandlerAction } = require('../middlewares/request.handler');
const { createCategoriaSchema, updateCategoriaSchema, getCategoriaSchema } = require('../schemas/categoria.schema');

// genero un router, argego una jalada
const router = express.Router();

// instancio el servicio
const servicio = CategoriaService.getInstance();

// regresa los elementos especificos dependiendo de los filtros como query(?)
router.get('/',
  // middlewares:
  requestHandlerGet(servicio, 'find'), // para validar la info que llega
);


// cuando hay un nivel de ruta que con¿incide con otro, hay que poner antes el que es especifico para que no choquen
router.get('/filtro', async (req, res) => {
  res.send('Estoy en un filtro de categorias');
});


// regresa el elemento especifico, dependiendo del filtro(especifico)
router.get('/:id',
  // middlewares:
  validatorHandler(getCategoriaSchema, 'params'), // para validar la info que llega en params (id)
  requestHandlerGetOne(servicio, 'findOne', 200),  // para enviar el request y/o capturar errores
);


// crea Categoria
router.post('/',
  validatorHandler(createCategoriaSchema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'create', 201, 'Creado') // para enviar el request y/o capturar errores
);


// update partial Categoria
router.patch('/:id',
  validatorHandler(getCategoriaSchema, 'params'), // para validar la info que llega en params (id)
  validatorHandler(updateCategoriaSchema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'update', 200, 'Actualizado solo unos campos') // para enviar el request y/o capturar errores
);

// update Categoria
router.put('/:id',
  validatorHandler(getCategoriaSchema, 'params'), // para validar la info que llega en params (id)
  validatorHandler(updateCategoriaSchema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'update', 200, 'Actualizado completo') // para enviar el request y/o capturar errores
);

// delete Categoria
router.delete('/:id',
  validatorHandler(getCategoriaSchema, 'params'), // para validar la info que llega en params (id)
  requestHandlerAction(servicio, 'delete', 200, 'Borrado') // para enviar el request y/o capturar errores

);



module.exports = router;
