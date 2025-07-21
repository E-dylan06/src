const express = require('express');
const respuesta = require('../../responses/responses');
const service = require('./historial-service');

const router = express.Router();

// Listar historial médico por paciente
router.get('/paciente/:paciente_id', async (req, res) => {
  try {
    const historial = await service.getByPacienteId(req.params.paciente_id);
    respuesta.success(req, res, historial, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Crear historial médico
router.post('/', async (req, res) => {
  try {
    await service.create(req.body);
    respuesta.success(req, res, 'Historial médico creado', 201);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Actualizar historial médico
router.put('/:id', async (req, res) => {
  try {
    await service.update(req.params.id, req.body);
    respuesta.success(req, res, 'Historial médico actualizado', 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Eliminar historial médico
router.delete('/:id', async (req, res) => {
  try {
    await service.remove(req.params.id);
    respuesta.success(req, res, 'Historial médico eliminado', 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

module.exports = router; 