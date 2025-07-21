const express = require('express');
const service = require('./notificaciones-service');
const respuesta = require('../../responses/responses');
const router = express.Router();

// Middleware de autenticación (asume req.user)
function soloPaciente(req, res, next) {
  if (req.user && req.user.rol_id === 3) return next();
  return respuesta.error(req, res, 'Solo pacientes pueden ver notificaciones', 403);
}

// Endpoint: obtener citas próximas del paciente autenticado
router.get('/proximas', soloPaciente, async (req, res) => {
  try {
    const items = await service.citasProximas(req.user.paciente_id);
    respuesta.success(req, res, items, 200);
  } catch (err) {
    respuesta.error(req, res, err.message, 500);
  }
});

module.exports = router; 