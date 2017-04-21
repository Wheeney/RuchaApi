/**
 * Load module dependencies
 */
var EventEmitter = require('events').EventEmitter;
var debug        = require('debug')('api:controller-athlete');
var moment       = require('moment');

var config       = require('../config');
var athleteDal   = require('../dal/athlete');

/**
 * create an athlete
 * 
 * @desc create an athlete and store them in the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.createAthlete = function createAthlete(req, res, next){
    debug('creating an athlete');

    var workflow = new EventEmitter();
    var body = req.body;

    workflow.on('createAthlete', function createAthlete(){
        athleteDal.create(body, function createcb(err, athlete){
            if(err){ return next(err);}

            workflow.emit('respond', athlete);
        });

    workflow.on('respond', function respond(athlete){
        res.status(201).json(athlete);
    });
});
workflow.emit('createAthlete');
};

/**
 * Get an athlete
 * 
 * @desc Fetch a single athlete from the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.fetchAthlete = (req, res, next) => {
    debug('Fetching athlete:', req.params._id);

    var query = { _id: req.params._id };
    athleteDal.get(query, function getcb(err, athlete) {
        if (err) { return next(err); }

        res.json(athlete);
    });
};

/**
 * Update athlete
 * 
 * @desc Get a single athlete from the database and update it.
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.updateAthlete = (req, res, next) => {
    debug('updating athlete:', req.params._id);

    var query = { _id: req.params._id };
    var body = req.body;

    athleteDal.update(query, body, function updatecb(err, athlete) {
        if (err) { return next(err); }

        res.json(athlete);
    });
};

/**
 * delete an athlete
 * 
 * @desc Get a single athlete from the database and delete it
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.deleteAthlete = (req, res, next) => {
    debug('deleting athlete:', req.params._id);

    var query = { _id: req.params._id };
    athleteDal.delete(query, function deletecb(err, athlete) {
        if (err) { return next(err); }

        res.json(athlete);
    });
};

/**
 * Get a collection of athletes
 * 
 * @desc Get a collection of athletes from the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.getAthletes = (req, res, next) => {
    debug('Fetching all athletes');

    var query = {};
    athleteDal.getCollection(query, function getAthleteCollections(err, athletes) {
        if (err) { return next(err); }

        res.json(athletes);
    });
};

/**
 * Get a collection of athletes by pagination
 * 
 * @desc Get a collection of athletes from the database by pagiation
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.fetchAllByPagination = function fetchAllAthletes(req, res, next) {
  debug('get a collection of athletes by pagination');

  // retrieve pagination query params
  var page   = req.query.page || 1;
  var limit  = req.query.per_page || 10;

  var opts = {
    page: page,
    limit: limit
  };
  var query = {};

  athleteDal.getCollectionByPagination(query, opts, function cb(err, athletes) {
    if(err) {
        return next(CustomError({
            name: 'SERVER_ERROR',
            message: err.message
        }));
    };
    res.json(athletes);
  });
};


