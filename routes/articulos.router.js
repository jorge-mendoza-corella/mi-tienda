const express = require('express');
const faker = require('faker');

// genero un router
const router = express.Router();

// regresa los elementos especificos dependiendo de los filtros como query(?)
router.get('/', (req, res) => {
  let { limit } = req.query
  limit = limit || 10;
  const items = [];

  // usamos el faker
  for (let i = 0; i < limit; i++) {
    items.push({
      nombre: faker.commerce.productName(),
      email: faker.commerce.price()
    });

  }
  res.json(items);
});

module.exports = router;
