const express = require('express');
const cors = require('cors');
const config = require('./config');
const auth = require('./modules/auth/auth-controller');
const users = require('./modules/users/users-controller');
const citas = require('./modules/citas/citas-controller');
const historial = require('./modules/historial/historial-controller');
const disponibilidad = require('./modules/disponibilidad/disponibilidad-controller');
const notificaciones = require('./modules/notificaciones/notificaciones-controller');
const dashboard = require('./modules/dashboard/dashboard-controller');
const horarios = require('./modules/horarios_medicos/horarios-controller');

const app = express();

// Configurar CORS
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('port', config.app.port);

// Rutas
app.use('/api/auth', auth);
app.use('/api/usuarios', users);
app.use('/api/citas', citas);
app.use('/api/historial', historial);
app.use('/api/disponibilidad', disponibilidad);
app.use('/api/notificaciones', notificaciones);
app.use('/api/dashboard', dashboard);
app.use('/api/horarios_medicos', horarios);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({
    message: 'Sistema de Citas Médicas API',
    version: '1.0.0',
    status: 'running'
  });
});

module.exports = app;