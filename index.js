const express = require('express');
const faker = require('faker');

var randomName = faker.name.findName();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('hola mi server en express')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('hola esta es unua nueva ruta')
})

// regresa los elementos especificos dependiendo de los filtros como query(?)
app.get('/personas', (req, res) => {
  let { limit } = req.query
  limit = limit || 10;
  const personas = [];

  // usamos el faker
  for (let i = 0; i < limit; i++) {
    personas.push({
      //nombre: faker.name.fullName(),
      nombre: faker.name.findName(),
      email: faker.internet.email()
      //email: faker.intenet.email()
    });

  }

  res.json(personas);
})

// regresa el elemento especifico, dependiendo de los dos filtros (especificos)
app.get('/personas/:personaId/autos/:autoId', (req, res) => {
  const { personaId, autoId } = req.params;
  res.json(
    {
      "quien": personaId,
      autoId
    }
  )
})

// cuando hay un nivel de ruta que con¿incide con otro, hay que poner antes el que es especifico para que no choquen
app.get('/personas/filtro', (req, res) => {
  res.send('Estoy en un filtro');
})

// regresa la lista completa
app.get('/personas', (req, res) => {
  res.json(
    [
      {
        "nombre": "Jorge",
        "apelillo": "Mendoza"
      },
      {
        "nombre": "Isaac",
        "apelillo": "Corella"
      }
    ]
  )
})


// regresa el elemento especifico, dependiendo del filtro(especifico)
app.get('/personas/:id', (req, res) => {
  const { id } = req.params;
  res.json(
    {
      "id": id,
      "nombre": "Jorge",
      "apelillo": "Mendoza"
    }
  )
})



app.listen(port, () => {
  console.log('Mi puerto ' + port);
})
