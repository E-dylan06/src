// dbConnection.js
const mysql = require('mysql2');
const config = require('../config');

const dbconfig = {
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  connectionLimit: config.mysql.connectionLimit
};

let pool;

function conMysql() {
  try {
    pool = mysql.createPool(dbconfig);
    
    // Probar la conexión
    pool.getConnection((err, connection) => {
      if (err) {
        console.log('[bd error]', err);
        console.log('Verifica:');
        console.log('- IP de la instancia AWS:', config.mysql.host);
        console.log('- Usuario:', config.mysql.user);
        console.log('- Base de datos:', config.mysql.database);
        console.log('- Grupo de seguridad permite conexiones desde tu IP');
      } else {
        console.log('DB conectado exitosamente');
        connection.release();
      }
    });
  } catch (error) {
    console.log('[bd error]', error);
  }
}

conMysql();

function getConnection() {
  return pool; // Retorna el pool de conexiones
}

module.exports = {
  getConnection,
};
