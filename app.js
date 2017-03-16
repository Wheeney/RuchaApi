// Load Module Dependencies
var express     = require('express');
var bodyParser  = require('body-parser');
var debug       = require('debug')('rucha-api');
var mongoose    = require('mongoose');
var validator   = require('express-validator');
var partialResponse = require('express-partial-response');
var morgan      = require('morgan');

var config      = require('./config');
var router      = require('./routes');
var authenticate = require('./lib/authenticate');

// Connect to Mongodb
mongoose.connect(config.MONGODB_URL);
// listen to connection event
mongoose.connection.on('connected', function mongodbConnectionListener() {
  debug('Mongodb Connected successfully');
});
// handle error event
mongoose.connection.on('error', function mongodbErrorListener() {
  debug('Connection to Mongodb Failed!!');

  // Try and Reconnect
  mongoose.connect(config.MONGODB_URL);

});


// Configuration

// Initialize app
var app = express();

// Authentication Middleware
app.use(authenticate().unless({
  path: ['/users/login', '/users/signup']
}));

// Set Middleware
app.use(partialResponse());
app.use(bodyParser.json());
app.use(morgan('dev'));


// Set Validator
app.use(validator());

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*" );
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Set Routes
router(app);

// Listen to HTTP Port
app.listen(config.HTTP_PORT, function connectionListener() {
  debug('API Server running on port %s', config.HTTP_PORT);
});

module.exports = app;