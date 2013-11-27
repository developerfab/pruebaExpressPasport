var mongoose = require('mongoose');
var schema = require("./User");
var User_model = mongoose.model('User');

//se conecta a la base de datos
mongoose.connect('mongodb://localhost/registro');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error en la conexion:'));
db.once('open', function callback () {
      console.log('Conectado a la BD');
});


