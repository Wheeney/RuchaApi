/**
 * Load module dependencies
 */
var EventEmitter = require('events').EventEmitter;
var debug        = require('debug')('api:controller-kit');
var moment       = require('moment');

var config       = require('../config');
var kitDal   = require('../dal/kit');

/**
 * create an kit
 * 
 * @desc create an kit and store them in the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.createKit = function createKit(req, res, next){
    debug('creating a kit');

    var workflow = new EventEmitter();
    var body = req.body;

    workflow.on('createKit', function createKit(){
        kitDal.create(body, function createcb(err, kit){
            if(err){ return next(err);}

            workflow.emit('respond', kit);
        });

    workflow.on('respond', function respond(kit){
        res.status(201).json(kit);
    });
});
workflow.emit('createKit');
};

/**
 * Get an kit
 * 
 * @desc Fetch a single kit from the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.fetchKit = (req, res, next) => {
    debug('Fetching kit:', req.params._id);

    var query = { _id: req.params._id };
    kitDal.get(query, function getcb(err, kit) {
        if (err) { return next(err); }

        res.json(kit);
    });
};

/**
 * Update kit
 * 
 * @desc Get a single kit from the database and update it.
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.updateKit = (req, res, next) => {
    debug('updating kit:', req.params._id);

    var query = { _id: req.params._id };
    var body = req.body;

    kitDal.update(query, body, function updatecb(err, kit) {
        if (err) { return next(err); }

        res.json(kit);
    });
};

/**
 * delete an kit
 * 
 * @desc Get a single kit from the database and delete it
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.deleteKit = (req, res, next) => {
    debug('deleting kit:', req.params._id);

    var query = { _id: req.params._id };
    kitDal.delete(query, function deletecb(err, kit) {
        if (err) { return next(err); }

        res.json(kit);
    });
};

/**
 * Get a collection of kits
 * 
 * @desc Get a collection of kits from the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.getKits = (req, res, next) => {
    debug('Fetching all kits');

    var query = {};
    kitDal.getCollection(query, function getKitCollections(err, kits) {
        if (err) { return next(err); }

        res.json(kits);
    });
};

/**
 * Get a collection of kits by pagination
 * 
 * @desc Get a collection of kits from the database by pagiation
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.fetchAllByPagination = (req, res, next)=> {
  debug('get a collection of kits by pagination');

  // retrieve pagination query params
  var page   = req.query.page || 1;
  var limit  = req.query.per_page || 10;

  var opts = {
    page: page,
    limit: limit
  };
  var query = {};

  kitDal.getCollectionByPagination(query, opts, function cb(err, kits) {
    if(err) {
        return next(CustomError({
            name: 'SERVER_ERROR',
            message: err.message
        }));
    };
    res.json(kits);
  });
};


