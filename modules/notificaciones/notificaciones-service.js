const dao = require('./notificaciones-dao');

module.exports = {
  async citasProximas(pacienteId) {
    if (!pacienteId) throw new Error('ID de paciente requerido');
    return await dao.citasProximasPorPaciente(pacienteId);
  }
}; 