const express = require('express');
const EspecieService = require('../services/especie.service');
const validatorHandler = require('../middlewares/validator.handler');
const { requestHandlerGet, requestHandlerGetOne, requestHandlerAction } = require('../middlewares/request.handler');
const { createEspecieSchema, updateEspecieSchema, getEspecieSchema } = require('../schemas/especie.schema');

// genero un router, argego una jalada
const router = express.Router();

// instancio el servicio
const servicio = EspecieService.getInstance();

// regresa los elementos especificos dependiendo de los filtros como query(?)
router.get('/',
  // middlewares:
  requestHandlerGet(servicio, 'find'), // para validar la info que llega
);


// cuando hay un nivel de ruta que con¿incide con otro, hay que poner antes el que es especifico para que no choquen
router.get('/filtro', async (req, res) => {
  res.send('Estoy en un filtro de Especies');
});


// regresa el elemento especifico, dependiendo del filtro(especifico)
router.get('/:id',
  // middlewares:
  validatorHandler(getEspecieSchema, 'params'), // para validar la info que llega en params (id)
  requestHandlerGetOne(servicio, 'findOne', 200),  // para enviar el request y/o capturar errores
);


// crea Especie
router.post('/',
  validatorHandler(createEspecieSchema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'create', 201, 'Creado') // para enviar el request y/o capturar errores
);


// update partial Especie
router.patch('/:id',
  validatorHandler(getEspecieSchema, 'params'), // para validar la info que llega en params (id)
  validatorHandler(updateEspecieSchema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'update', 200, 'Actualizado solo unos campos') // para enviar el request y/o capturar errores
);

// update Especie
router.put('/:id',
  validatorHandler(getEspecieSchema, 'params'), // para validar la info que llega en params (id)
  validatorHandler(updateEspecieSchema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'update', 200, 'Actualizado completo') // para enviar el request y/o capturar errores
);

// delete Especie
router.delete('/:id',
  validatorHandler(getEspecieSchema, 'params'), // para validar la info que llega en params (id)
  requestHandlerAction(servicio, 'delete', 200, 'Borrado') // para enviar el request y/o capturar errores

);



module.exports = router;
