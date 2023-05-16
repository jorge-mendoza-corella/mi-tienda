const express = require('express');
const personasRouter = require('./personas.router');
const personasRouterV2 = require('./personas.router.v2');
const articulosRouter = require('./articulos.router');
const categoriasRouter = require('./categorias.router');
const animalesRouterV2 = require('./animales.router.v2');
const especiesRouterV2 = require('./especies.router.v2');
const ropasRouterV2 = require('./ropa.router.v2');
const tiposRopaRouterV2 = require('./tipoRopa.router.v2');
const uno1Router = require('./uno1.router');
const uno2Router = require('./uno2.router');
const unoRouter = require('./uno.router');
const muchosRouter = require('./muchos.router');
const userRouter = require('./user.router.v2');

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
  routerV1.use('/uno1', uno1Router);
  routerV1.use('/uno2', uno2Router);
  routerV1.use('/uno', unoRouter);
  routerV1.use('/muchos', muchosRouter);

  // ruteos de v2
  routerV2.use('/personas', personasRouterV2);
  routerV2.use('/animales', animalesRouterV2);
  routerV2.use('/especies', especiesRouterV2);
  routerV2.use('/ropas', ropasRouterV2);
  routerV2.use('/tipos-ropa', tiposRopaRouterV2);
  routerV2.use('/user', userRouter);

}

module.exports = routerApp;
