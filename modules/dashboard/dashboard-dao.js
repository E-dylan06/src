const db = require('../../infraestructure/database-connection');

module.exports = {
  // Métricas generales
  async getMetrics() {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          (SELECT COUNT(*) FROM citas) AS total_citas,
          (SELECT COUNT(*) FROM pacientes) AS total_pacientes,
          (SELECT COUNT(*) FROM medicos) AS total_medicos,
          (SELECT COUNT(*) FROM citas WHERE fecha = CURDATE()) AS citas_hoy`,
        [],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        }
      );
    });
  },
  // Métricas por médico
  async getMetricsByMedico(medicoId) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          COUNT(*) AS total_citas,
          SUM(CASE WHEN estado = 'completada' THEN 1 ELSE 0 END) AS citas_completadas,
          SUM(CASE WHEN estado = 'cancelada' THEN 1 ELSE 0 END) AS citas_canceladas
         FROM citas WHERE medico_id = ?`,
        [medicoId],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0]);
        }
      );
    });
  }
}; 