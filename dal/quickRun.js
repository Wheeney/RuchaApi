'use strict'
/**
 * Load module dependencies
 */
var debug      = require('debug')('api:dal-quickRun');
var moment     = require('moment');
var QuickRun   = require('../models/quickRun');
/**
 * create a quickRun
 * 
 * @desc create a new quickRun and save the data in the database
 * @param {object} quickRunData  data for the quickRun being created.
 * @param {function} cb  callback for once the quickRun has been created
 */
exports.create = (quickRunData, cb)=>{
    debug('Creating a new quickRun');

    //create a new quickRun
    var newQuickRun = new QuickRun(quickRunData);
    newQuickRun.save((err, quickRun)=>{
        if(err){ return cb(err); };

        exports.get({_id: quickRun._id}, function(err, quickRun){
            if (err){ return cb(err) };
            cb(null, quickRun);
        });
    });
 };


/**
 * Delete a quickRun
 * 
 * @desc delete data of the quickRun frm the database
 * @param {object} query  Query object
 * @param {function} cb  callback for once delete is complete
 */
exports.delete = (query, cb) => {
    debug('deleting quickRun:', query);

    var Promise = QuickRun.findOne(query).exec()
    .then(quickRun => {
        if (!quickRun) { return cb(null, {}); }
        
        quickRun.remove(quickRun => { return cb(null, quickRun);
            })
            .catch(err => { return cb(err);
                });
            });
        };


/**
 * update a quickRun
 * 
 * @desc update data of a quickRun with a given id 
 * @param {object} query  Query object
 * @param {object} updates update data
 * @param {function} cb  callback for once update is complete 
 */
exports.update = (query, updates, cb) => {
    debug('updating quickRun:', query);

    var now = moment().toISOString();
    updates.last_modified = now;

    var Promise = QuickRun.findOneAndUpdate(query, updates).exec()
    .then(quickRun => { 
        return cb(null, quickRun || {});
        })
        .catch(err => { return cb(err);
        });
    };


/**
 * Get a quickRun
 * 
 * @desc get a quickRun with a specific id from db 
 * @param {object} query  Query object
 * @param {function} cb  callback for once fetch is complete
 */
exports.get = (query, cb) => {
    debug('fetching quickRun:', query);

    var Promise = QuickRun.findOne(query).exec()
    .then(quickRun => { 
        return cb(null, quickRun || {});
     })
     .catch(err => { 
         return cb(err)
        });
    };


/**
 * Get a collection of quickRuns
 * 
 * @desc Get a collection of quickRuns from the database 
 * @param {object} query  Query object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = (query, cb) => {
    debug('Fetching a collection of quickRuns');

    var Promise = QuickRun.find(query).exec()
    .then(quickRuns => { return cb(null, quickRuns);
    })
    .catch(err => { return cb(err);
    });
};
