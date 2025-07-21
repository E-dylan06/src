const db = require('./historial-dao');

function getByPacienteId(paciente_id) {
  return db.getByPacienteId(paciente_id);
}

function create(data) {
  return db.create(data);
}

function update(id, data) {
  return db.update(id, data);
}

function remove(id) {
  return db.remove(id);
}

module.exports = {
  getByPacienteId,
  create,
  update,
  remove
}; 