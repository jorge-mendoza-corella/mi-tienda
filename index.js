const express = require('express');
const routerApp = require('./routes');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('hola mi server en express')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('hola esta es unua nueva ruta')
})

routerApp(app);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Mi puerto ' + port);
})
