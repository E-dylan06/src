const { getConnection } = require('../../infraestructure/database-connection');

// Obtener todos los usuarios
function getAll() {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    pool.query(
      `SELECT u.id, u.nombre, u.correo, u.activo, r.nombre as rol
       FROM usuarios u
       JOIN roles r ON u.rol_id = r.id`,
      (error, result) => error ? reject(error) : resolve(result)
    );
  });
}

// Obtener usuario por ID
function getById(id) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    pool.query(
      `SELECT u.id, u.nombre, u.correo, u.activo, u.rol_id, r.nombre AS rol
FROM usuarios u
JOIN roles r ON u.rol_id = r.id
WHERE u.id = ?
`,
      [id],
      (error, result) => error ? reject(error) : resolve(result[0])
    );
  });
}

// Actualizar usuario
function update(id, data) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    pool.query(
      `UPDATE usuarios SET nombre = ?, correo = ?, rol_id = ?, activo = ? WHERE id = ?`,
      [data.nombre, data.correo, data.rol_id, data.activo, id],
      (error, result) => error ? reject(error) : resolve(result)
    );
  });
}

// Eliminar usuario
function remove(id) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    pool.query(
      `DELETE FROM usuarios WHERE id = ?`,
      [id],
      (error, result) => error ? reject(error) : resolve(result)
    );
  });
}

function getMedicos() {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    pool.query(
      `SELECT u.id, u.nombre, u.correo, u.activo, r.nombre as rol
       FROM usuarios u
       JOIN roles r ON u.rol_id = r.id
       WHERE u.rol_id = 2`,
      (error, result) => error ? reject(error) : resolve(result)
    );
  });
}

function getAdmins() {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    pool.query(
      `SELECT u.id, u.nombre, u.correo, u.activo, r.nombre as rol
       FROM usuarios u
       JOIN roles r ON u.rol_id = r.id
       WHERE u.rol_id = 1`,
      (error, result) => error ? reject(error) : resolve(result)
    );
  });
}

function getPacientes() {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    pool.query(
      `SELECT u.id, u.nombre, u.correo, u.activo, r.nombre as rol
       FROM usuarios u
       JOIN roles r ON u.rol_id = r.id
       WHERE u.rol_id = 3`,
      (error, result) => error ? reject(error) : resolve(result)
    );
  });
}

function getMedicoById(id) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    pool.query(
      `SELECT u.id, u.nombre, u.correo, m.especialidad, m.consultorio, m.telefono, m.bio
       FROM usuarios u
       JOIN medicos m ON u.id = m.usuario_id
       WHERE u.id = ? AND u.rol_id = 2`,
      [id],
      (error, result) => error ? reject(error) : resolve(result[0])
    );
  });
}

module.exports = {
  getAll,
  getById,
  update,
  remove,
  getMedicos,
  getAdmins,
  getPacientes,
  getMedicoById
}; 