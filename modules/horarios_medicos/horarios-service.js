const dao = require('./horarios-dao');

module.exports = {
  getByMedicoId: (medicoId) => dao.getByMedicoId(medicoId),
  create: (data) => dao.create(data),
  update: (id, data) => dao.update(id, data),
  remove: (id) => dao.remove(id)
}; 