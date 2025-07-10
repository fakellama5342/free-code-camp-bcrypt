'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const app = express();
const bcrypt = require('bcrypt'); 

const saltRounds = 12;
const myPlaintextPassword = 'superpassword!';
const someOtherPlaintextPassword = 'pass123';



app.get('/_api/package.json', function(req, res) {
  res.sendFile(__dirname + '/package.json');
});




fccTesting(app); // For FCC testing purposes

app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.route('/').get((req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Listening on port: ' + port);
}); 