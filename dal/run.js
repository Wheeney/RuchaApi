'use strict'
/**
 * Load module dependencies
 */
var debug      = require('debug')('rucha-api');
var moment     = require('moment');
var Run        = require('../models/run');
var population = [{ path: 'user' }];


/**
 * create a run
 * 
 * @desc create a new run and save the data in the database
 * @param {object} runData  data for the run being created.
 * @param {function} cb  callback for once the run has been created
 */
exports.create = (runData, cb)=>{
    debug('Creating a new run');

    //create a new run
    var newRun = new Run(runData);
    newRun.save((err, run)=>{
        if(err){ return cb(err); };

        exports.get({_id: run._id}, function(err, run){
            if (err){ return cb(err) };
            cb(null, run);
        });
    });
 };


/**
 * Delete a run
 * 
 * @desc delete data of the run frm the database
 * @param {object} query  Query object
 * @param {function} cb  callback for once delete is complete
 */
exports.delete = (query, cb) => {
    debug('deleting run:', query);

    var Promise = Run.findOne(query).populate(population).exec()
    .then(run => {
        if (!run) { return cb(null, {}); }
        
        run.remove(run => { return cb(null, run);
            })
            .catch(err => { return cb(err);
                });
            });
        };


/**
 * update a run
 * 
 * @desc update data of a run with a given id 
 * @param {object} query  Query object
 * @param {object} updates update data
 * @param {function} cb  callback for once update is complete 
 */
exports.update = (query, updates, cb) => {
    debug('updating run:', query);

    var now = moment().toISOString();
    updates.last_modified = now;

    var Promise = Run.findOneAndUpdate(query, updates).populate(population).exec()
    .then(run => { 
        return Promise;
        })
        .catch(err => { return cb(err);
        });
    };


/**
 * Get a run
 * 
 * @desc get a run with a specific id from db 
 * @param {object} query  Query object
 * @param {function} cb  callback for once fetch is complete
 */
exports.get = (query, cb) => {
    debug('fetching user:', query);

    var Promise = Run.findOne(query).populate(population).exec()
    .then(run => { 
        return cb(null, run || {});
     })
     .catch(err => { 
         return cb(err)
        });
    };


/**
 * Get a collection of runs
 * 
 * @desc Get a collection of runs from the database 
 * @param {object} query  Query object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = (query, cb) => {
    debug('Fetching a collection of runs');

    var Promise = Run.find(query).populate(population).exec()
    .then(runs => { return cb(null, runs);
    })
    .catch(err => { return cb(err);
    });
};