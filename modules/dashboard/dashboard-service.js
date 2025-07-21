const dao = require('./dashboard-dao');

module.exports = {
  async obtenerMetricas() {
    return await dao.getMetrics();
  },
  async obtenerMetricasPorMedico(medicoId) {
    if (!medicoId) throw new Error('ID de médico requerido');
    return await dao.getMetricsByMedico(medicoId);
  }
}; 