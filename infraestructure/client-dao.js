const { getConnection } = require('./database-connection'); // Importar la función de conexión

function list(tabla) {
  return new Promise((resolve, reject) => {
    const conexion = getConnection(); // Obtener la conexión
    conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function selectById(tabla, id) {
  return new Promise((resolve, reject) => {
    const conexion = getConnection(); // Obtener la conexión
    conexion.query(`SELECT * FROM ${tabla} WHERE id = ${id}`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function add(tabla, data) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${tabla} (nombre, edad, profesion) VALUES (?, ?, ?)`;
    const values = [data.nombre, data.edad, data.profesion];
    const conexion = getConnection(); // Obtener la conexión
    conexion.query(query, values, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

function deleteById(tabla, id) {
  return new Promise((resolve, reject) => {
    const conexion = getConnection(); // Obtener la conexión
    conexion.query(`DELETE FROM ${tabla} WHERE id = ${id}`, (error, result) => {
      return error ? reject(error) : resolve(result);
    });
  });
}

module.exports = {
  list,
  selectById,
  add,
  deleteById,
};
