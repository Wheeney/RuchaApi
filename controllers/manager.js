// Load Module Dependencies
var debug = require('debug')('super-api');

var managerDal  = require('../dal/manager');

/**
 * Get manager
 */
exports.getManager = function getManager(req, res, next) {
    debug('Fetching manager:', req.params._id);

    var query = { _id:req.params._id };

    managerDal.get(query, function getcb(err, manager){
        if (err) { return next(err);}

        res.json(manager);
    });
};


/**
 * Update manager
 */
exports.updateManager = function updateManager(req, res, next) {
    debug('updating manager:', req.params._id);

    var query = { _id:req.params._id };
    var body  = req.body;

    managerDal.update(query, body, function updatecb(err, manager){
        if (err) { return next(err);}

        res.json(manager);
    });
};


/**
 * Get managers
 */
exports.getManagers = function getManagers(req, res, next) {
    debug('Fetching all managers');

    var query = {};
    
    managerDal.getCollection(query, function getManagerCollections(err, managers){
        if(err){
            return next(err);
        }
        res.json(managers);
    })
};


// no operation(noop) function
exports.noop = function noop (req, res, next) {
  res.json({
    message: 'To Implemented!'
  });
};