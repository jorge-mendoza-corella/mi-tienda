const express = require('express');
const ArticuloService = require('../services/articulo.service');
const validatorHandler = require('../middlewares/validator.handler');
const { requestHandlerGet, requestHandlerGetOne, requestHandlerAction } = require('../middlewares/request.handler');
const { createArticuloSchema, updateArticuloSchema, getArticuloSchema } = require('../schemas/articulo.schema');

// genero un router
const router = express.Router();

// instancio el servicio
const servicio = ArticuloService.getInstance();

// regresa los elementos especificos dependiendo de los filtros como query(?)
router.get('/',
  // middlewares:
  requestHandlerGet(servicio, 'find'), // para validar la info que llega
  /*   async (req, res) => {
      const articuloService = await ArticuloService.getInstance();
      const articulos = await articuloService.find();
      if (articulos.length == 0)
        return res.status(404).json({
          message: 'No hay articulos'
        })
      res.json(articulos);
    } */
);



// cuando hay un nivel de ruta que con¿incide con otro, hay que poner antes el que es especifico para que no choquen
router.get('/filtro', async (req, res) => {
  res.send('Estoy en un filtro de articulos');
});


// regresa el elemento especifico, dependiendo del filtro(especifico)
router.get('/:id',
  // middlewares:
  validatorHandler(getArticuloSchema, 'params'), // para validar la info que llega
  /*   async (req, res, next) => {
      try {
        const { id } = req.params;
        const articulo = await articuloService.findOne(id);
        res.json(articulo);
      } catch (error) {
        next(error);
      }
    }*/
  requestHandlerGetOne(servicio, 'findOne', 'params',200),  // para enviar el request y/o capturar errores
);


// crea articulo
router.post('/',
  validatorHandler(createArticuloSchema, 'body'), // para validar la info que llega
/*   async (req, res, next) => {
    try {
      const articulo = req.body;
      await articuloService.create(articulo);
      res.status(201).json({
        message: 'Creado',
        articulo: articulo
      })
    } catch (error) {
      next(error);
    }
  } */

  requestHandlerAction(servicio, 'create', 'body,', 201, 'Creado') // para enviar el request y/o capturar errores
);


// update partial articulo
router.patch('/:id',
  validatorHandler(updateArticuloSchema, 'body'), // para validar la info que llega
 /*  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const articulo = await articuloService.update(id, body);
      res.json({
        message: 'Actualizado solo unos campos',
        articulo
      });
    } catch (error) {
      next(error);
    }
  } */
  requestHandlerAction(servicio, 'update', 'body,params', 200, 'Actualizado solo unos campos') // para enviar el request y/o capturar errores
  );

// update articulo
router.put('/:id',
  validatorHandler(updateArticuloSchema, 'body'), // para validar la info que llega
/*   async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const articulo = await articuloService.update(id, body);
      res.json({
        message: 'Actualizado completo',
        articulo
      })
    } catch (error) {
      next(error);
    }
  } */

  requestHandlerAction(servicio, 'update', 'body,params', 200, 'Actualizado completo') // para enviar el request y/o capturar errores
  );

// delete articulo
router.delete('/:id',
  validatorHandler(getArticuloSchema, 'params'), // para validar la info que llega
/*   async (req, res, next) => {
    try {
      const { id } = req.params;
      const articulo = await articuloService.delete(id);
      res.json({
        message: 'Borrado',
        articulo: articulo
      })
    } catch (error) {
      next(error);
    }
  } */
  requestHandlerAction(servicio, 'delete', ',params', 200, 'Borrado') // para enviar el request y/o capturar errores

  );



module.exports = router;
