const express = require('express');
const PersonaService = require('../services/persona.service');
const varias = require('../utilities/varias');
// esta es la version 2 de este router, voy a hacerle cambios para que se tengan las dos versiones por un tiempo

// genero un router
const router = express.Router();

// regresa los elementos especificos dependiendo de los filtros como query(?)
router.get('/', async (req, res) => {
  const personaService = await PersonaService.getInstance();
  const personas = await personaService.find();
  if (personas.length == 0)
    return res.status(404).json({
      message: 'No hay personas'
    })
  res.json(personas);
});


// regresa el elemento especifico, dependiendo de los dos filtros (especificos)
router.get('/:personaId/autos/:autoId', async (req, res) => {
  const { personaId, autoId } = req.params;
  res.json(
    {
      "ID_persona": personaId,
      autoId
    }
  )
});

// cuando hay un nivel de ruta que con¿incide con otro, hay que poner antes el que es especifico para que no choquen
router.get('/filtro', async (req, res) => {
  res.send('Estoy en un filtro V2');
});


// regresa el elemento especifico, dependiendo del filtro(especifico)
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const personaService = await PersonaService.getInstance();
    const persona = await personaService.findOne(id);
    if (!persona)
      return res.status(404).json({
        message: 'Persona no encontrada'
      })
    res.json(persona);
  } catch (error) {
    next(error);
  }
});


// crea persona
router.post('/', async (req, res) => {
  const persona = req.body;
  const personaService = await PersonaService.getInstance();
  await personaService.create(persona);
  res.status(201).json({
    message: 'Creado',
    persona: persona
  })

});


// update partial persona v2
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const personaService = await PersonaService.getInstance();
    const persona = await personaService.update(id, body);
    res.json({
      message: 'Actualizado solo unos campos',
      persona
    });
  } catch (error) {
    res.status(404).json({
      message: 'Persona no encontrada, error en: ' + varias.errorFunctionName(error)
    })
  }
});

// update persona
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const personaService = await PersonaService.getInstance();
    const persona = await personaService.update(id, body);
    res.json({
      message: 'Actualizado completo',
      persona
    });
  } catch (error) {
    res.status(404).json({
      message: 'Persona no encontrada, error en: ' + varias.errorFunctionName(error)
    });
  }
});

// delete persona
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const personaService = await PersonaService.getInstance();
    const persona = await personaService.delete(id);
    res.json({
      message: 'Borrado',
      persona: persona
    });
  } catch (error) {
    res.status(404).json({
      message: 'Persona no encontrada, error en: ' + varias.errorFunctionName(error)
    });
  }
});



module.exports = router;
