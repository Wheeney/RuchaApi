// Load Module Dependencies
var express  = require('express');

var request  = require('request');

var geocode = require('../controllers/geocode');

// Create a Router
var router = express.Router();

//GET 
router.post('/find/:location', geocode.getCoordinates);

// Export Router
module.exports = router;

