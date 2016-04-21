// Imports
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var dbConnection = require('./db/connection');

// Init express
var app = express();

// Middleware & routers
app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use('/', routes);

dbConnection.initializeDB();

// Start server
var server = app.listen(process.env.PORT || 3000, function() {
  var port = server.address().port;
  console.log('Listening on port', port, '. Use Control + C to exit.');
});
