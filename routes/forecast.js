// Load Module Dependencies
var express  = require('express');

var request  = require('request');

var forecast = require('../controllers/forecast');

// Create a Router
var router = express.Router();

//GET weather/forecast
router.post('/forecast/:location', forecast.getForecast);

// Export Router
module.exports = router;

