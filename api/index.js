const express = require('express');
const routerApp = require('./routes');
const {logErrors,errorHandler,errorBoom,errorDBHandler} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.get('/api', (req, res) => {
  res.send('hola mi server en express')
})

app.get('/api/nueva-ruta', (req, res) => {
  res.send('hola esta es unua nueva ruta')
})

require('./utilities/auth')

routerApp(app);
app.use(logErrors);
app.use(errorBoom);
app.use(errorDBHandler);
app.use(errorHandler);


app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Mi puerto ' + port);
})
