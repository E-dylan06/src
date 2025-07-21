const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const db = require('./auth-dao');

async function register(userData) {
  // Verificar si el correo ya existe
  const existingUser = await db.findUserByEmail(userData.correo);
  if (existingUser) {
    throw new Error('El correo ya está registrado');
  }

  // Encriptar contraseña
  const hashedPassword = await bcrypt.hash(userData.contrasena, 10);
  
  // Crear usuario
  const user = {
    nombre: userData.nombre,
    correo: userData.correo,
    contrasena: hashedPassword,
    rol_id: userData.rol_id
  };

  return await db.createUser(user);
}

async function login(credentials) {
  // Buscar usuario por correo
  const user = await db.findUserByEmail(credentials.correo);
  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  // Verificar contraseña
  const isValidPassword = await bcrypt.compare(credentials.contrasena, user.contrasena);
  if (!isValidPassword) {
    throw new Error('Credenciales inválidas');
  }

  // Verificar si el usuario está activo
  if (!user.activo) {
    throw new Error('Usuario inactivo');
  }

  // Generar token JWT
  const token = jwt.sign(
    { 
      id: user.id, 
      correo: user.correo, 
      rol_id: user.rol_id 
    },
    config.app.jwt_secret,
    { expiresIn: '24h' }
  );

  return {
    token,
    user: {
      id: user.id,
      nombre: user.nombre,
      correo: user.correo,
      rol_id: user.rol_id,
      rol_nombre: user.rol_nombre
    }
  };
}

module.exports = {
  register,
  login
}; 