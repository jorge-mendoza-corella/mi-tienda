const express = require('express');
const personasRouter = require('./personas.router');
const personasRouterV2 = require('./personas.router.v2');
const articulosRouter = require('./articulos.router');
const categoriasRouter = require('./categorias.router');
const animalesRouterV2 = require('./animales.router.v2');
const especiesRouterV2 = require('./especies.router.v2');

function routerApp(app) {

  // middleware para json
  app.use(express.json());

  const routerV1 = express.Router();
  const routerV2 = express.Router();

  app.use('/api/v1', routerV1);
  app.use('/api/v2', routerV2);

  // ruteos de v1
  routerV1.use('/personas', personasRouter);
  routerV1.use('/articulos', articulosRouter);
  routerV1.use('/categorias', categoriasRouter);

  // ruteos de v2
  routerV2.use('/personas', personasRouterV2);
  routerV2.use('/animales', animalesRouterV2);
  routerV2.use('/especies', especiesRouterV2);

}

module.exports = routerApp;
