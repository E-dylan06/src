const { getConnection } = require('./database-connection');

function list(tabla) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    pool.query(`SELECT * FROM ${tabla} ORDER BY fechaActualizacion DESC`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function selectById(tabla, id) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    pool.query(`SELECT * FROM ${tabla} WHERE id = ?`, [id], (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function add(tabla, data) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${tabla} (titulo, contenido) VALUES (?, ?)`;
    const values = [data.titulo, data.contenido];
    const pool = getConnection();
    pool.query(query, values, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function update(tabla, id, data) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE ${tabla} SET titulo = ?, contenido = ? WHERE id = ?`;
    const values = [data.titulo, data.contenido, id];
    const pool = getConnection();
    pool.query(query, values, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function deleteById(tabla, id) {
  return new Promise((resolve, reject) => {
    const pool = getConnection();
    pool.query(`DELETE FROM ${tabla} WHERE id = ?`, [id], (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

module.exports = {
  list,
  selectById,
  add,
  update,
  deleteById,
}; 