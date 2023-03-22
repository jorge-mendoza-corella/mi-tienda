const express = require('express');
const PersonaService = require('../services/persona.service');
const validatorHandler = require('../middlewares/validator.handler');
const { requestHandlerGet, requestHandlerGetOne, requestHandlerAction } = require('../middlewares/request.handler');
const { createPersonaSchema, updatePersonaSchema, getPersonaSchema } = require('../schemas/persona.schema');


// esta es la version 2 de este router, voy a hacerle cambios para que se tengan las dos versiones por un tiempo

// genero un router
const router = express.Router();

// instancio el servicio
const servicio = PersonaService.getInstance();

// cuando hay un nivel de ruta que con¿incide con otro, hay que poner antes el que es especifico para que no choquen
router.get('/filtro', async (req, res) => {
  res.send('Estoy en un filtro V2');
});

// regresa los elementos especificos dependiendo de los filtros como query(?)
router.get('/',
  // middlewares:
  requestHandlerGet(servicio, 'find'), // para validar la info que llega
);


// cuando hay un nivel de ruta que con¿incide con otro, hay que poner antes el que es especifico para que no choquen
router.get('/filtro', async (req, res) => {
  res.send('Estoy en un filtro de Personas');
});


// regresa el elemento especifico, dependiendo del filtro(especifico)
router.get('/:id',
  // middlewares:
  //validatorHandler(getPersonaSchema, 'params'), // para validar la info que llega en params (id)
  requestHandlerGetOne(servicio, 'findOne', 'params', 200),  // para enviar el request y/o capturar errores
);

/*
// crea Persona
router.post('/',
  validatorHandler(createPersonaSchema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'create', 'body,', 201, 'Creado') // para enviar el request y/o capturar errores
);


// update partial Persona
router.patch('/:id',
  validatorHandler(getPersonaSchema, 'params'), // para validar la info que llega en params (id)
  validatorHandler(updatePersonaSchema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'update', 'body,params', 200, 'Actualizado solo unos campos') // para enviar el request y/o capturar errores
);

// update Persona
router.put('/:id',
  validatorHandler(getPersonaSchema, 'params'), // para validar la info que llega en params (id)
  validatorHandler(updatePersonaSchema, 'body'), // para validar la info que llega en body (elemento)
  requestHandlerAction(servicio, 'update', 'body,params', 200, 'Actualizado completo') // para enviar el request y/o capturar errores
);

// delete Persona
router.delete('/:id',
  validatorHandler(getPersonaSchema, 'params'), // para validar la info que llega en params (id)
  requestHandlerAction(servicio, 'delete', ',params', 200, 'Borrado') // para enviar el request y/o capturar errores

); */


module.exports = router;
