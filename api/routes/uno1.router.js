const express = require('express');
const Uno1Service = require('../services/uno1.service');
const validatorHandler = require('../middlewares/validator.handler');
const { requestHandlerGet, requestHandlerGetOne, requestHandlerAction } = require('../middlewares/request.handler');
const { createUno1Schema, updateUno1Schema, getUno1Schema } = require('../schemas/uno1.schema');

// genero un router, argego una jalada
const router = express.Router();

// instancio el servicio
const servicio = Uno1Service.getInstance();

// regresa los elementos especificos dependiendo de los filtros como query(?)
router.get('/',
  // middlewares:
  requestHandlerGet(servicio, 'find'), // para validar la info que llega
);


// cuando hay un nivel de ruta que con¿incide con otro, hay que poner antes el que es especifico para que no choquen
router.get('/filtro', async (req, res) => {
  res.send('Estoy en un filtro de uno1s');
});


// regresa el elemento especifico, dependiendo del filtro(especifico)
router.get('/:id',
  // middlewares:
  validatorHandler(getUno1Schema, 'params'), // para validar la info que llega en params (id)
  requestHandlerGetOne(servicio, 'findOne', 200),  // para enviar el request y/o capturar errores
);


// crea uno1
router.post('/',
  validatorHandler(createUno1Schema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'create', 201, 'Creado') // para enviar el request y/o capturar errores
);


// update partial uno1
router.patch('/:id',
  validatorHandler(getUno1Schema, 'params'), // para validar la info que llega en params (id)
  validatorHandler(updateUno1Schema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'update', 200, 'Actualizado solo unos campos') // para enviar el request y/o capturar errores
);

// update uno1
router.put('/:id',
  validatorHandler(getUno1Schema, 'params'), // para validar la info que llega en params (id)
  validatorHandler(updateUno1Schema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'update', 200, 'Actualizado completo') // para enviar el request y/o capturar errores
);

// delete uno1
router.delete('/:id',
  validatorHandler(getUno1Schema, 'params'), // para validar la info que llega en params (id)
  requestHandlerAction(servicio, 'delete', 200, 'Borrado') // para enviar el request y/o capturar errores

);



module.exports = router;
