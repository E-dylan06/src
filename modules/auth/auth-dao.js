const { getConnection } = require('../../infraestructure/database-connection');

function findUserByEmail(email) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    const query = `
      SELECT u.*, r.nombre as rol_nombre 
      FROM usuarios u 
      JOIN roles r ON u.rol_id = r.id 
      WHERE u.correo = ?
    `;
    pool.query(query, [email], (error, result) => {
      return error ? reject(error) : resolve(result[0]);
    });
  });
}

function createUser(userData) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    const query = `INSERT INTO usuarios (nombre, correo, contrasena, rol_id) VALUES (?, ?, ?, ?)`;
    const values = [userData.nombre, userData.correo, userData.contrasena, userData.rol_id];
    pool.query(query, values, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function getUserById(id) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    const query = `
      SELECT u.*, r.nombre as rol_nombre 
      FROM usuarios u 
      JOIN roles r ON u.rol_id = r.id 
      WHERE u.id = ?
    `;
    pool.query(query, [id], (error, result) => {
      return error ? reject(error) : resolve(result[0]);
    });
  });
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    const query = `
      SELECT u.id, u.nombre, u.correo, u.activo, r.nombre as rol_nombre 
      FROM usuarios u 
      JOIN roles r ON u.rol_id = r.id
    `;
    pool.query(query, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

module.exports = {
  findUserByEmail,
  createUser,
  getUserById,
  getAllUsers
}; 