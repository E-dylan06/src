const express = require('express');
const respuesta = require('../../responses/responses');
const service = require('./users-service');

const router = express.Router();

// Listar todos los médicos
router.get('/medicos', async (req, res) => {
  try {
    const medicos = await service.getMedicos();
    respuesta.success(req, res, medicos, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Obtener detalles de un médico por ID
router.get('/medicos/:id', async (req, res) => {
  try {
    const medico = await service.getMedicoById(req.params.id);
    if (medico) {
      respuesta.success(req, res, medico, 200);
    } else {
      respuesta.error(req, res, 'Médico no encontrado o el usuario no es un médico', 404);
    }
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Listar todos los administradores
router.get('/admins', async (req, res) => {
  try {
    const admins = await service.getAdmins();
    respuesta.success(req, res, admins, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Listar todos los pacientes
router.get('/pacientes', async (req, res) => {
  try {
    const pacientes = await service.getPacientes();
    respuesta.success(req, res, pacientes, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Listar todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await service.getAll();
    respuesta.success(req, res, users, 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Obtener usuario por ID
router.get('/:id', async (req, res) => {
  try {
    const user = await service.getById(req.params.id);
    if (user) {
      respuesta.success(req, res, user, 200);
    } else {
      respuesta.error(req, res, 'Usuario no encontrado', 404);
    }
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Actualizar usuario
router.put('/:id', async (req, res) => {
  try {
    await service.update(req.params.id, req.body);
    respuesta.success(req, res, 'Usuario actualizado', 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  try {
    await service.remove(req.params.id);
    respuesta.success(req, res, 'Usuario eliminado', 200);
  } catch (err) {
    respuesta.error(req, res, err, 500);
  }
});

module.exports = router; 