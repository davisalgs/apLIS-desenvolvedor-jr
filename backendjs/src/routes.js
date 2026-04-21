const express = require('express');
const PacienteController = require('./controllers/PacienteController');

const router = express.Router();


router.get('/pacientes', PacienteController.index);
router.get('/pacientes/:id', PacienteController.show);
router.post('/pacientes', PacienteController.store);
router.put('/pacientes/:id', PacienteController.update);
router.delete('/pacientes/:id', PacienteController.destroy);

module.exports = router;
