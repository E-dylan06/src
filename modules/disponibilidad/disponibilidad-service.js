const dao = require('./disponibilidad-dao');

module.exports = {
  async obtenerPorMedico(medicoId) {
    if (!medicoId) throw new Error('ID de médico requerido');
    return await dao.getByMedicoId(medicoId);
  },
  async actualizarDisponibilidad(medicoId, data) {
    if (!medicoId) throw new Error('ID de médico requerido');
    if (!data.horario_inicio || !data.horario_fin || !data.dias_disponibles) {
      throw new Error('Datos de disponibilidad incompletos');
    }
    return await dao.updateDisponibilidad(medicoId, data);
  }
}; 