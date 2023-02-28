const personasRouter = require('./personas.router');
const articulosRouter = require('./articulos.router');

function routerApp(app) {
  app.use('/personas', personasRouter);
  app.use('/articulos', articulosRouter);
}

module.exports = routerApp;
