const express = require('express');
const { body, validationResult } = require('express-validator');
const respuesta = require('../../responses/responses');
const service = require('./auth-service');

const router = express.Router();

// Middleware para validar errores
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      error: true, 
      status: 400, 
      body: errors.array() 
    });
  }
  next();
};

// Registro de usuarios
router.post('/register', [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('correo').isEmail().withMessage('El correo debe ser válido'),
  body('contrasena').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('rol_id').isInt({ min: 1, max: 3 }).withMessage('Rol inválido')
], handleValidationErrors, async function(req, res) {
  try {
    const result = await service.register(req.body);
    respuesta.success(req, res, "Usuario registrado con éxito", 201);
  } catch(err) {
    respuesta.error(req, res, err.message, 500);
  }
});

// Login de usuarios
router.post('/login', [
  body('correo').isEmail().withMessage('El correo debe ser válido'),
  body('contrasena').notEmpty().withMessage('La contraseña es requerida')
], handleValidationErrors, async function(req, res) {
  try {
    const result = await service.login(req.body);
    respuesta.success(req, res, result, 200);
  } catch(err) {
    respuesta.error(req, res, err.message, 401);
  }
});

module.exports = router; 