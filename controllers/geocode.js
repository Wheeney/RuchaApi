/**
 * Load module dependencies
 */
var moment  = require('moment');
var debug   = require('debug')('rucha-api');
var request = require('request');

/**
 * Get location coordinates
 */
exports.getCoordinates = function getCoordinates(req, res, next){
    debug('Getting coordinates of location:', req.params.location);
    
    var query= req.params.location 

    request('https://maps.googleapis.com/maps/api/geocode/json?address='+query+'&key=AIzaSyDlweacuTHT3rxacwQGYdvotc1yKd2Bs7g', function (err, response, body) {
        if (!err && response.statusCode == 200) {
            console.log(body);
            res.send(body); // this will send data to client.
        }
    });
};