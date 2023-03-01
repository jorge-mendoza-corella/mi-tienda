const express = require('express');
const PersonaService = require('../services/persona.service');
// esta es la version 2 de este router, voy a hacerle cambios para que se tengan las dos versiones por un tiempo

// genero un router
const router = express.Router();

// instancio el servicio
const service = new PersonaService();

// regresa los elementos especificos dependiendo de los filtros como query(?)
router.get('/', (req, res) => {
  const personas = service.find();
  res.json(personas);
});


// regresa el elemento especifico, dependiendo de los dos filtros (especificos)
router.get('/:personaId/autos/:autoId', (req, res) => {
  const { personaId, autoId } = req.params;
  res.json(
    {
      "ID_persona": personaId,
      autoId
    }
  )
});

// cuando hay un nivel de ruta que con¿incide con otro, hay que poner antes el que es especifico para que no choquen
router.get('/filtro', (req, res) => {
  res.send('Estoy en un filtro V2');
});


// regresa el elemento especifico, dependiendo del filtro(especifico)
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const persona = service.findOne(id);
  res.json(persona);
});


// crea persona
router.post('/', (req, res) => {
  const persona = req.body;
  service.create(persona);
  res.status(201).json({
    message: 'Creado',
    persona: persona
  })

});


// update partial persona
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'Actualizado solo unos campos',
    id: id,
    data: body
  })
});

// update persona
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'Actualizado completo',
    id: id,
    data: body
  })
});

// delete persona
router.delete('/:id', (req, res) => {

  const { id } = req.params;
  const persona = service.delete(id);
  res.json({
    message: 'Borrado',
    persona: persona
  })
});



module.exports = router;
