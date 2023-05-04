const express = require('express');
const Uno2Service = require('../services/uno2.service');
const validatorHandler = require('../middlewares/validator.handler');
const { requestHandlerGet, requestHandlerGetOne, requestHandlerAction } = require('../middlewares/request.handler');
const { createUno2Schema, updateUno2Schema, getUno2Schema } = require('../schemas/uno2.schema');

// genero un router, argego una jalada
const router = express.Router();

// instancio el servicio
const servicio = Uno2Service.getInstance();

// regresa los elementos especificos dependiendo de los filtros como query(?)
router.get('/',
  // middlewares:
  requestHandlerGet(servicio, 'find'), // para validar la info que llega
);


// cuando hay un nivel de ruta que con¿incide con otro, hay que poner antes el que es especifico para que no choquen
router.get('/filtro', async (req, res) => {
  res.send('Estoy en un filtro de uno2s');
});


// regresa el elemento especifico, dependiendo del filtro(especifico)
router.get('/:id',
  // middlewares:
  validatorHandler(getUno2Schema, 'params'), // para validar la info que llega en params (id)
  requestHandlerGetOne(servicio, 'findOne', 200),  // para enviar el request y/o capturar errores
);


// crea Uno2
router.post('/',
  validatorHandler(createUno2Schema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'create', 201, 'Creado') // para enviar el request y/o capturar errores
);


// update partial Uno2
router.patch('/:id',
  validatorHandler(getUno2Schema, 'params'), // para validar la info que llega en params (id)
  validatorHandler(updateUno2Schema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'update', 200, 'Actualizado solo unos campos') // para enviar el request y/o capturar errores
);

// update Uno2
router.put('/:id',
  validatorHandler(getUno2Schema, 'params'), // para validar la info que llega en params (id)
  validatorHandler(updateUno2Schema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'update', 200, 'Actualizado completo') // para enviar el request y/o capturar errores
);

// delete Uno2
router.delete('/:id',
  validatorHandler(getUno2Schema, 'params'), // para validar la info que llega en params (id)
  requestHandlerAction(servicio, 'delete', 200, 'Borrado') // para enviar el request y/o capturar errores

);



module.exports = router;
