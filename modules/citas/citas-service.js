const db = require('./citas-dao');

function getAll() {
  return db.getAll();
}

function getByUserId(usuario_id, rol) {
  return db.getByUserId(usuario_id, rol);
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
  getAll,
  getByUserId,
  create,
  update,
  remove
};