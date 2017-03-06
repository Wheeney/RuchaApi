/**
 * Load module dependencies
 */
var debug = require('debug')('rucha-api');
var moment = require('moment');

var Run = require('../models/run');

var population = [{path:'user'}];


/**
 * create a run
 * @desc create a new run and save the data in the database
 * 
 * @param {object} runData  data for the run being created.
 * @param {function} cb  callback for once the run has been created
 */
exports.create = function create(runData, cb){
    debug('Creating a new run');

    //create a new run
    var newRun = new Run(runData);

    newRun.save(function saveRun(err, run){
        if(err){
            return cb(err);
        };

        exports.get({_id:run._id}, function(err, run){
            if (err){
                return cb(err)
            };
            cb(null, run);
        });
        return;

    });
};

/**
 * Delete a run
 * @desc delete data of the run with the given id
 * 
 * @param {object} query  Query object
 * @param {function} cb  callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb){
    debug('deleting run:', query);
    
    Run
             .findOne(query)
             .populate(population)
             .exec(function deleteRun(err, run){
                 if(err){ return cb(err); }

                 if(!run){
                     return cb(new Error('Selected run does not exist'));
                 };

                 run.remove(function(err){
                     if(err){ return cb(err);}

                     cb(null, run);
                 });
             });
};

/**
 * update a run
 * @desc update data of a run with a given id
 * 
 * @param {object} query  Query object
 * @param {object} updates update data
 * @param {function} cb  callback for once update is complete
 * 
 */
exports.update = function update(query, updates, cb){
    debug('updating run:', query);
    var now = moment().toISOString();
    updates.last_modified = now;
    Run
       .findOneAndUpdate(query, updates)
       .populate(population)
       .exec(function updateRun(err, run){
           if (err){ return cb(err);}
           cb(null, run || {});
       });
};
/**
 * Get a run
 * @desc get a run with a specific id from db
 * 
 * @param {object} query  Query object
 * @param {function} cb  callback for once fetch is complete
 */
exports.get = function get(query, cb){
    debug('Fetching run:', query);
    Run
       .findOne(query)
       .populate(population)
       .exec(function fetchRun(err, run){
           if(err){ return cb(err);}
           cb(null, run);
       });
};

/**
 * Get a collection of runs
 * @desc Get a collection of runs from the database
 * 
 * @param {object} query  Query object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb){
    debug('Getting a collection of runs');

    Run
       .find(query)
       .populate(population)
       .exec(function getRunsCollection(err, runs){
           if(err){ return cb(err);}
           cb(null, runs);
       });
};
