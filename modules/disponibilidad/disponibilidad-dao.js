const db = require('../../infraestructure/database-connection');

module.exports = {
  // Obtener disponibilidad de un médico
  async getByMedicoId(medicoId) {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT horario_inicio, horario_fin, dias_disponibles FROM medicos WHERE id = ?',
        [medicoId],
        (err, results) => {
          if (err) return reject(err);
          if (results.length === 0) return resolve(null);
          resolve(results[0]);
        }
      );
    });
  },

  // Actualizar disponibilidad de un médico
  async updateDisponibilidad(medicoId, { horario_inicio, horario_fin, dias_disponibles }) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE medicos SET horario_inicio = ?, horario_fin = ?, dias_disponibles = ? WHERE id = ?',
        [horario_inicio, horario_fin, dias_disponibles, medicoId],
        (err, result) => {
          if (err) return reject(err);
          resolve(result.affectedRows > 0);
        }
      );
    });
  }
}; 