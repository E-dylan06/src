const express = require('express');
const service = require('./disponibilidad-service');
const respuesta = require('../../responses/responses');
const router = express.Router();

// Middleware de autenticación y roles (asume req.user)
function soloMedicoOAdmin(req, res, next) {
  if (req.user && req.user.rol_id === 1) return next();
  if (req.user && req.user.rol_id === 2 && parseInt(req.params.medicoId) === req.user.medico_id) return next();
  return respuesta.error(req, res, 'No autorizado', 403);
}

// Obtener disponibilidad de un médico
router.get('/:medicoId', async (req, res) => {
  try {
    const item = await service.obtenerPorMedico(req.params.medicoId);
    if (!item) return respuesta.error(req, res, 'Médico no encontrado', 404);
    respuesta.success(req, res, item, 200);
  } catch (err) {
    respuesta.error(req, res, err.message, 500);
  }
});

// Actualizar disponibilidad de un médico
router.put('/:medicoId', soloMedicoOAdmin, async (req, res) => {
  try {
    const ok = await service.actualizarDisponibilidad(req.params.medicoId, req.body);
    if (!ok) return respuesta.error(req, res, 'No se pudo actualizar', 400);
    respuesta.success(req, res, 'Disponibilidad actualizada', 200);
  } catch (err) {
    respuesta.error(req, res, err.message, 500);
  }
});

module.exports = router; 