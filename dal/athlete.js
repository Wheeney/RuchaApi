'use-strict'
/**
 * Load Module Dependencies.
 */
var debug      = require('debug')('api:dal-athlete');
var moment     = require('moment');
var Athlete    = require('../models/athlete');
var returnFields = Athlete.whitelist;

/**
 * create a new athlete.
 *
 * @desc  creates a new athlete and save them in the database
 * @param {Object}  athleteData  Data for the athlete to create
 * @param {Function} cb Callback for once saving is complete
 */
exports.create = function create(athleteData, cb) {
  debug('creating a new athlete');

  // Create athlete
  var newAthlete  = new Athlete(athleteData);

  newAthlete.save(function saveAthlete(err, athlete) {
    if (err) { return cb(err); }

    exports.get({ _id: athlete._id }, function (err, athlete) {
      if(err) { return cb(err); }

      cb(null, athlete);
    });
  });
};

/**
 * delete athlete
 *
 * @desc  delete data of the athlete with the given id
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = (query, cb)=>{
    debug('deleting athlete:', query);

    var Promise = Athlete.findOne(query, returnFields).exec()
    .then(athlete=>{
        if(!athlete){ return cb(null, {});}

        Athlete.remove(athlete=>{ return cb(null, athlete);
        })
        .catch(err=>{ return cb(err);
        });
    });
};

/**
 * update a athlete
 *
 * @desc  update data of the athlete with the given id
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = (query, updates,cb)=>{
    debug('updating athlete:', query);

    var now = moment().toISOString();
    updates.last_modified = now;

    var Promise = Athlete.findOneAndUpdate(query, updates, returnFields).exec()
    .then(athlete=>{ return cb(null, athlete || {});
    })
    .catch(err=>{ return cb(err);
    });
};

/**
 * get a athlete.
 *
 * @desc get a athlete with the given id from db
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = (query, cb)=>{
    debug('fetching athlete:', query);

    var Promise =Athlete.findOne(query, returnFields).exec()
    .then(athlete=>{ return cb(null, athlete || {});
    })
    .catch(err=>{ return cb(err);
    });
};

/**
 * get a collection of athletes
 *
 * @desc get a collection of athletes from db
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = (query, cb)=>{
    debug('Fetching a collection of athletes');

    var Promise = Athlete.find(query, returnFields).exec()
    .then(athletes=>{ return cb(null, athletes);
    })
    .catch(err=>{ return cb(err);
    });
}; 

/**
 * Get a collection of athletes by pagination
 * 
 * @desc Get a collection of athletes from the database by pagination
 * @param {object} query  Query object
 * @param {object} opts  options object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, opts, cb) {
  debug('fetching a collection of athletes');
  var opts = {
    columns:  returnFields,
    sortBy:   opts.sort || {},
    page:     opts.page,
    limit:    opts.limit
  };
  Athlete.paginate(query, opts, function (err, docs, page, count) {
    if(err) { return cb(err);}
    var data = {
      total_pages: page,
      total_docs_count: count,
      docs: docs
    };
    cb(null, data);
  });
};