const db = require('../../infraestructure/database-connection');

module.exports = {
  // Listar horarios de un médico
  async getByMedicoId(medicoId) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM horarios_medicos WHERE medico_id = ? AND activo = 1 ORDER BY FIELD(dia_semana, 'Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'), hora_inicio`,
        [medicoId],
        (err, results) => err ? reject(err) : resolve(results)
      );
    });
  },
  // Crear franja horaria
  async create(data) {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO horarios_medicos (medico_id, dia_semana, hora_inicio, hora_fin, duracion_citas, activo) VALUES (?, ?, ?, ?, ?, 1)`,
        [data.medico_id, data.dia_semana, data.hora_inicio, data.hora_fin, data.duracion_citas || 30],
        (err, result) => err ? reject(err) : resolve(result)
      );
    });
  },
  // Editar franja horaria
  async update(id, data) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE horarios_medicos SET dia_semana = ?, hora_inicio = ?, hora_fin = ?, duracion_citas = ?, activo = ? WHERE id = ?`,
        [data.dia_semana, data.hora_inicio, data.hora_fin, data.duracion_citas || 30, data.activo, id],
        (err, result) => err ? reject(err) : resolve(result)
      );
    });
  },
  // Eliminar franja horaria
  async remove(id) {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM horarios_medicos WHERE id = ?`,
        [id],
        (err, result) => err ? reject(err) : resolve(result)
      );
    });
  }
}; 