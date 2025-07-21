const app = require('./app');
const config = require('./config');

const server = app.listen(config.app.port, () => {
  console.log('🚀 Servidor iniciado correctamente');
  console.log(`📍 Puerto: ${config.app.port}`);
  console.log(`🌐 URL: http://localhost:${config.app.port}`);
  console.log(`📊 Base de datos: ${config.mysql.host}:${config.mysql.port}/${config.mysql.database}`);
  console.log('✅ Sistema de Citas Médicas API está funcionando');
});

// Manejo de errores del servidor
server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Error: El puerto ${config.app.port} ya está en uso`);
  } else {
    console.error('❌ Error al iniciar el servidor:', error);
  }
});

// Manejo de señales para cerrar el servidor
process.on('SIGINT', () => {
  console.log('\n🛑 Cerrando servidor...');
  server.close(() => {
    console.log('✅ Servidor cerrado correctamente');
    process.exit(0);
  });
}); 