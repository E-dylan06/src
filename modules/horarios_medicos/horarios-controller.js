const express = require('express');
const service = require('./horarios-service');
const respuesta = require('../../responses/responses');
const router = express.Router();

// Listar horarios de un médico
router.get('/:medicoId', async (req, res) => {
  try {
    const horarios = await service.getByMedicoId(req.params.medicoId);
    respuesta.success(req, res, horarios, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Crear franja horaria
router.post('/', async (req, res) => {
  try {
    await service.create(req.body);
    respuesta.success(req, res, 'Horario creado', 201);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Editar franja horaria
router.put('/:id', async (req, res) => {
  try {
    await service.update(req.params.id, req.body);
    respuesta.success(req, res, 'Horario actualizado', 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Eliminar franja horaria
router.delete('/:id', async (req, res) => {
  try {
    await service.remove(req.params.id);
    respuesta.success(req, res, 'Horario eliminado', 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

module.exports = router; 