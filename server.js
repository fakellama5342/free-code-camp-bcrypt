'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const app = express();
const bcrypt = require('bcrypt');

const saltRounds = 12;
const myPlaintextPassword = 'superpassword!';
const someOtherPlaintextPassword = 'pass123';

// Middleware para servir archivos estáticos (como index.html)
app.use('/public', express.static(process.cwd() + '/public'));

// Middleware para parsear cuerpos de solicitud (POST)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para el archivo package.json (CRUCIAL PARA FREECODECAMP)
// freeCodeCamp busca este archivo para verificar las dependencias.
app.get('/_api/package.json', function(req, res) {
  res.sendFile(__dirname + '/package.json');
});

// Ruta principal para servir tu archivo index.html
app.route('/').get((req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Configuración de freeCodeCamp testing (no modificar)
fccTesting(app);

// Inicia el servidor en el puerto proporcionado por el entorno (Render)
// o en el puerto 3000 para desarrollo local.
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port: ' + port);
});

// Aquí iría el código específico de los desafíos de BCrypt
// Por ejemplo, para generar un hash:
/*
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  if (err) {
    console.error('Error al generar hash:', err);
    return;
  }
  console.log('Hash generado:', hash);
});
*/