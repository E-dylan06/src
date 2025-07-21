const { getConnection } = require('../../infraestructure/database-connection');

// Listar todas las citas (admin)
function getAll() {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    pool.query(
      `SELECT c.*, 
              m.usuario_id as medico_usuario_id, 
              p.usuario_id as paciente_usuario_id,
              m.especialidad,
              u1.nombre as medico_nombre,
              u2.nombre as paciente_nombre
       FROM citas c
       JOIN medicos m ON c.medico_id = m.id
       JOIN pacientes p ON c.paciente_id = p.id
       JOIN usuarios u1 ON m.usuario_id = u1.id
       JOIN usuarios u2 ON p.usuario_id = u2.id
       ORDER BY c.fecha DESC, c.hora_inicio DESC`,
      (error, result) => error ? reject(error) : resolve(result)
    );
  });
}

// Listar citas por usuario (paciente o médico)
function getByUserId(usuario_id, rol) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    let query = '';
    if (rol == 2) {
      query = `
        SELECT c.*, 
               m.id as medico_id,
               m.usuario_id as medico_usuario_id,
               m.especialidad,
               m.consultorio,
               m.telefono,
               m.bio,
               p.usuario_id as paciente_usuario_id, 
               u2.nombre as paciente_nombre
        FROM citas c
        JOIN medicos m ON c.medico_id = m.id
        JOIN pacientes p ON c.paciente_id = p.id
        JOIN usuarios u2 ON p.usuario_id = u2.id
        WHERE m.usuario_id = ?
        ORDER BY c.fecha DESC, c.hora_inicio DESC
      `;
    } else {
      query = `
        SELECT c.*, m.usuario_id as medico_usuario_id, u1.nombre as medico_nombre
        FROM citas c
        JOIN medicos m ON c.medico_id = m.id
        JOIN pacientes p ON c.paciente_id = p.id
        JOIN usuarios u1 ON m.usuario_id = u1.id
        WHERE p.usuario_id = ?
        ORDER BY c.fecha DESC, c.hora_inicio DESC
      `;
    }
    pool.query(query, [usuario_id], (error, result) => error ? reject(error) : resolve(result));
  });
}

// Crear cita
function create(data) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    const query = `INSERT INTO citas (medico_id, paciente_id, fecha, hora_inicio, hora_fin, estado, motivo) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [data.medico_id, data.paciente_id, data.fecha, data.hora_inicio, data.hora_fin, data.estado || 'pendiente', data.motivo];
    pool.query(query, values, (error, result) => error ? reject(error) : resolve(result));
  });
}

// Actualizar cita
function update(id, data) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    const query = `UPDATE citas SET medico_id = ?, paciente_id = ?, fecha = ?, hora_inicio = ?, hora_fin = ?, estado = ?, motivo = ? WHERE id = ?`;
    const values = [data.medico_id, data.paciente_id, data.fecha, data.hora_inicio, data.hora_fin, data.estado, data.motivo, id];
    pool.query(query, values, (error, result) => error ? reject(error) : resolve(result));
  });
}

// Eliminar cita
function remove(id) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    pool.query(`DELETE FROM citas WHERE id = ?`, [id], (error, result) => error ? reject(error) : resolve(result));
  });
}

module.exports = {
  getAll,
  getByUserId,
  create,
  update,
  remove
};
