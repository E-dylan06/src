const express = require('express');
const service = require('./dashboard-service');
const respuesta = require('../../responses/responses');
const router = express.Router();

// Métricas generales
router.get('/metrics', async (req, res) => {
  try {
    const items = await service.obtenerMetricas();
    respuesta.success(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err.message, 500);
  }
});

// Métricas por médico
router.get('/medico/:id', async (req, res) => {
  try {
    const items = await service.obtenerMetricasPorMedico(req.params.id);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err.message, 500);
  }
});

module.exports = router; 