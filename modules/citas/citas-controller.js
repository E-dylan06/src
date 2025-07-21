const express = require('express');
const respuesta = require('../../responses/responses');
const service = require('./citas-service');

const router = express.Router();

// Listar todas las citas (admin)
router.get('/', async (req, res) => {
  try {
    const citas = await service.getAll();
    respuesta.success(req, res, citas, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Listar citas por usuario (paciente o médico)
router.get('/usuario/:usuario_id/:rol', async (req, res) => {
  try {
    const citas = await service.getByUserId(req.params.usuario_id, req.params.rol);
    respuesta.success(req, res, citas, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Crear cita
router.post('/', async (req, res) => {
  try {
    await service.create(req.body);
    respuesta.success(req, res, 'Cita creada', 201);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Actualizar cita
router.put('/:id', async (req, res) => {
  try {
    await service.update(req.params.id, req.body);
    respuesta.success(req, res, 'Cita actualizada', 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Eliminar cita
router.delete('/:id', async (req, res) => {
  try {
    await service.remove(req.params.id);
    respuesta.success(req, res, 'Cita eliminada', 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

module.exports = router;