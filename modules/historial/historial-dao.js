const { getConnection } = require('../../infraestructure/database-connection');

// Listar historial médico por paciente
function getByPacienteId(paciente_id) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    pool.query(
      `SELECT h.*, c.fecha, c.hora, m.usuario_id as medico_usuario_id, u.nombre as medico_nombre
       FROM historial_medico h
       JOIN citas c ON h.cita_id = c.id
       JOIN medicos m ON c.medico_id = m.id
       JOIN usuarios u ON m.usuario_id = u.id
       JOIN pacientes p ON c.paciente_id = p.id
       WHERE p.id = ?
       ORDER BY h.fecha_registro DESC`,
      [paciente_id],
      (error, result) => error ? reject(error) : resolve(result)
    );
  });
}

// Crear historial médico
function create(data) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    const query = `INSERT INTO historial_medico (cita_id, diagnostico, tratamiento, notas_adicionales) VALUES (?, ?, ?, ?)`;
    const values = [data.cita_id, data.diagnostico, data.tratamiento, data.notas_adicionales];
    pool.query(query, values, (error, result) => error ? reject(error) : resolve(result));
  });
}

// Actualizar historial médico
function update(id, data) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    const query = `UPDATE historial_medico SET diagnostico = ?, tratamiento = ?, notas_adicionales = ? WHERE id = ?`;
    const values = [data.diagnostico, data.tratamiento, data.notas_adicionales, id];
    pool.query(query, values, (error, result) => error ? reject(error) : resolve(result));
  });
}

// Eliminar historial médico
function remove(id) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    pool.query(`DELETE FROM historial_medico WHERE id = ?`, [id], (error, result) => error ? reject(error) : resolve(result));
  });
}

module.exports = {
  getByPacienteId,
  create,
  update,
  remove
}; 