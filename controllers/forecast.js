/**
 * Load module dependencies
 */
var moment  = require('moment');
var debug   = require('debug')('api:controller-forecast');
var request = require('request');

var runDal  = require('../dal/run');


/**
 * Get forecast of a specific location
 */
exports.getForecast = function getForecast(req, res, next){
    debug('Collecting current weather of location:', req.params.location);
    
    var query= req.params.location 

    request('http://api.apixu.com/v1/current.json?key=7c98e0eece2843839b1122356172302&q='+query+'', function (err, response, body) {
        if (!err && response.statusCode == 200) {
            console.log(body);
            res.send(body); // this will send data to client.
        }
    });
};