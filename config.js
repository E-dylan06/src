require('dotenv').config();

//Variables globales del sistema
module.exports = {

    app :{
        port : process.env.PORT || 3002,
        jwt_secret: process.env.JWT_SECRET || 'tu_secreto_jwt_super_seguro'
    },
    mysql:{
        host: process.env.MYSQL_HOST || '3.148.182.220',
        port: process.env.MYSQL_PORT || 3306,
        user: process.env.MYSQL_USER || 'usuario_prueba',
        password: process.env.MYSQL_PASSWORD || 'admin',
        database: process.env.MYSQL_DATABASE || 'prueba',
        connectionLimit: 10
    }
}