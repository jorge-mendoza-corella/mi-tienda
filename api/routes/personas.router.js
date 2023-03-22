const express = require('express');
const faker = require('faker');

// genero un router
const router = express.Router();

// regresa los elementos especificos dependiendo de los filtros como query(?)
router.get('/', (req, res) => {
  let { limit } = req.query
  limit = limit || 10;
  const personas = [];

  // usamos el faker
  for (let i = 0; i < limit; i++) {
    personas.push({
      nombre: faker.name.findName(),
      email: faker.internet.email()
    });

  }
  res.json(personas);
});

// regresa la lista completa (aqui nunca va a etrar poruqe arriba esta la otra)
router.get('/', (req, res) => {
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
});

// regresa el elemento especifico, dependiendo de los dos filtros (especificos)
router.get('/:personaId/autos/:autoId', (req, res) => {
  const { personaId, autoId } = req.params;
  res.json(
    {
      "quien": personaId,
      autoId
    }
  )
});

// cuando hay un nivel de ruta que con¿incide con otro, hay que poner antes el que es especifico para que no choquen
router.get('/filtro', (req, res) => {
  res.send('Estoy en un filtro');
});


// regresa el elemento especifico, dependiendo del filtro(especifico)
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json(
    {
      "id": id,
      "nombre": "Jorge",
      "apelillo": "Mendoza"
    }
  )
});


module.exports = router;
