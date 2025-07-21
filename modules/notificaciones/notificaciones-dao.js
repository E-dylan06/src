const db = require('../../infraestructure/database-connection');

module.exports = {
  // Obtener citas próximas (en las próximas 24 horas) para un paciente
  async citasProximasPorPaciente(pacienteId) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT c.id, c.fecha, c.hora, c.estado, m.nombre AS medico_nombre, m.especialidad
         FROM citas c
         JOIN medicos m ON c.medico_id = m.id
         WHERE c.paciente_id = ?
           AND c.estado IN ('pendiente', 'confirmada')
           AND CONCAT(c.fecha, ' ', c.hora) >= NOW()
           AND CONCAT(c.fecha, ' ', c.hora) <= DATE_ADD(NOW(), INTERVAL 24 HOUR)
         ORDER BY c.fecha, c.hora`,
        [pacienteId],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  }
}; 