const app = require('./app'); 

// Inicializar el servidor
app.listen(app.get('port'), () => {
    console.log("Servidor del Sistema de Citas Médicas escuchando en el puerto", app.get("port"));
});
