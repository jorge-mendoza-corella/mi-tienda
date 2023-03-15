const express = require('express');
const ArticuloService = require('../services/articulo.service');
const varias = require('../utilities/varias');

// genero un router
const router = express.Router();

// instancio el servicio
const service = new ArticuloService();

// regresa los elementos especificos dependiendo de los filtros como query(?)
router.get('/', async (req, res) => {
  const articulos = await service.find();
  if (articulos.length == 0)
    return res.status(404).json({
      message: 'No hay articulos'
    })
  res.json(articulos);
});



// cuando hay un nivel de ruta que con¿incide con otro, hay que poner antes el que es especifico para que no choquen
router.get('/filtro', async (req, res) => {
  res.send('Estoy en un filtro de articulos');
});


// regresa el elemento especifico, dependiendo del filtro(especifico)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const articulo = await service.findOne(id);
  if (!articulo)
    return res.status(404).json({
      message: 'Articulo no encontrado'
    })

  res.json(articulo);
});


// crea articulo
router.post('/', async (req, res) => {
  const articulo = req.body;
  await service.create(articulo);
  res.status(201).json({
    message: 'Creado',
    articulo: articulo
  })

});


// update partial articulo
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const articulo = await service.update(id, body);
    res.json({
      message: 'Actualizado solo unos campos',
      articulo
    });
  } catch (error) {
    res.status(404).json({
      message: 'Articulo no encontrado, error en: ' + varias.errorFunctionName(error)
    });
  }
});

// update articulo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const articulo = await service.update(id, body);
    res.json({
      message: 'Actualizado completo',
      articulo
    })
  } catch (error) {
    res.status(404).json({
      message: 'Articulo no encontrado, error en: ' + varias.errorFunctionName(error)
    });
  }
});

// delete articulo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const articulo = await service.delete(id);
    res.json({
      message: 'Borrado',
      articulo: articulo
    })
  } catch (error) {
    res.status(404).json({
      message: 'Articulo no encontrado, error en: ' + varias.errorFunctionName(error)
    });
  }
});



module.exports = router;
