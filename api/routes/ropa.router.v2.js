const express = require('express');
const RopaService = require('../services/ropa.service');
const validatorHandler = require('../middlewares/validator.handler');
const { requestHandlerGet, requestHandlerGetOne, requestHandlerAction } = require('../middlewares/request.handler');
const { createRopaSchema, updateRopaSchema, getRopaSchema } = require('../schemas/ropa.schema');
const passport = require('passport');
const {checkRoles} = require('./../middlewares/auth.handler');

// genero un router, argego una jalada
const router = express.Router();

// instancio el servicio
const servicio = RopaService.getInstance();

// regresa los elementos especificos dependiendo de los filtros como query(?)
router.get('/',
  // middlewares:
  requestHandlerGet(servicio, 'find'), // para validar la info que llega
);


// cuando hay un nivel de ruta que con¿incide con otro, hay que poner antes el que es especifico para que no choquen
router.get('/filtro', async (req, res) => {
  res.send('Estoy en un filtro de Ropas');
});


// regresa el elemento especifico, dependiendo del filtro(especifico)
router.get('/:id',
  // middlewares:
  validatorHandler(getRopaSchema, 'params'), // para validar la info que llega en params (id)
  requestHandlerGetOne(servicio, 'findOne', 200),  // para enviar el request y/o capturar errores
);


// crea Ropa
router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createRopaSchema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'create', 201, 'Creado') // para enviar el request y/o capturar errores
);


// update partial Ropa
router.patch('/:id',
  validatorHandler(getRopaSchema, 'params'), // para validar la info que llega en params (id)
  validatorHandler(updateRopaSchema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'update', 200, 'Actualizado solo unos campos') // para enviar el request y/o capturar errores
);

// update Ropa
router.put('/:id',
  validatorHandler(getRopaSchema, 'params'), // para validar la info que llega en params (id)
  validatorHandler(updateRopaSchema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'update', 200, 'Actualizado completo') // para enviar el request y/o capturar errores
);

// delete Ropa
router.delete('/:id',
  validatorHandler(getRopaSchema, 'params'), // para validar la info que llega en params (id)
  requestHandlerAction(servicio, 'delete', 200, 'Borrado') // para enviar el request y/o capturar errores

);



module.exports = router;
