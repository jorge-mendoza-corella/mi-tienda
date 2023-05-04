const express = require('express');
const TipoRopaService = require('../services/tipoRopa.service');
const validatorHandler = require('../middlewares/validator.handler');
const { requestHandlerGet, requestHandlerGetOne, requestHandlerAction } = require('../middlewares/request.handler');
const { createTipoRopaSchema, updateTipoRopaSchema, getTipoRopaSchema } = require('../schemas/tipoRopa.schema');

// genero un router, argego una jalada
const router = express.Router();

// instancio el servicio
const servicio = TipoRopaService.getInstance();

// regresa los elementos especificos dependiendo de los filtros como query(?)
router.get('/',
  // middlewares:
  requestHandlerGet(servicio, 'find'), // para validar la info que llega
);


// cuando hay un nivel de ruta que con¿incide con otro, hay que poner antes el que es especifico para que no choquen
router.get('/filtro', async (req, res) => {
  res.send('Estoy en un filtro de TipoRopas');
});


// regresa el elemento especifico, dependiendo del filtro(especifico)
router.get('/:id',
  // middlewares:
  validatorHandler(getTipoRopaSchema, 'params'), // para validar la info que llega en params (id)
  requestHandlerGetOne(servicio, 'findOne', 200),  // para enviar el request y/o capturar errores
);


// crea TipoRopa
router.post('/',
  validatorHandler(createTipoRopaSchema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'create', 201, 'Creado') // para enviar el request y/o capturar errores
);


// update partial TipoRopa
router.patch('/:id',
  validatorHandler(getTipoRopaSchema, 'params'), // para validar la info que llega en params (id)
  validatorHandler(updateTipoRopaSchema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'update', 200, 'Actualizado solo unos campos') // para enviar el request y/o capturar errores
);

// update TipoRopa
router.put('/:id',
  validatorHandler(getTipoRopaSchema, 'params'), // para validar la info que llega en params (id)
  validatorHandler(updateTipoRopaSchema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'update', 200, 'Actualizado completo') // para enviar el request y/o capturar errores
);

// delete TipoRopa
router.delete('/:id',
  validatorHandler(getTipoRopaSchema, 'params'), // para validar la info que llega en params (id)
  requestHandlerAction(servicio, 'delete', 200, 'Borrado') // para enviar el request y/o capturar errores

);



module.exports = router;
