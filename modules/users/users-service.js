const db = require('./users-dao');

function getAll() {
  return db.getAll();
}

function getById(id) {
  return db.getById(id);
}

function update(id, data) {
  return db.update(id, data);
}

function remove(id) {
  return db.remove(id);
}

function getMedicos() {
  return db.getMedicos();
}

function getAdmins() {
  return db.getAdmins();
}

function getPacientes() {
  return db.getPacientes();
}

function getMedicoById(id) {
  return db.getMedicoById(id);
}

module.exports = {
  getAll,
  getById,
  update,
  remove,
  getMedicos,
  getAdmins,
  getPacientes,
  getMedicoById
}; 