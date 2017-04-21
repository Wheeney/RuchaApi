'use-strict'
/**
 * Load Module Dependencies.
 */
var debug      = require('debug')('api:dal-kit');
var moment     = require('moment');
var Kit        = require('../models/kit');
var returnFields = Kit.whitelist;

/**
 * create a new kit.
 *
 * @desc  creates a new kit and save it in the database
 * @param {Object}  kitData  Data for the kit to create
 * @param {Function} cb Callback for once saving is complete
 */
exports.create = function create(kitData, cb) {
  debug('creating a new kit');

  // Create kit
  var newKit  = new Kit(kitData);

  newKit.save(function saveKit(err, kit) {
    if (err) { return cb(err); }

    exports.get({ _id: kit._id }, function (err, kit) {
      if(err) { return cb(err); }

      cb(null, kit);
    });
  });
};

/**
 * delete kit
 *
 * @desc  delete data of the kit with the given id
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = (query, cb)=>{
    debug('deleting kit:', query);

    var Promise = Kit.findOne(query, returnFields).exec()
    .then(kit=>{
        if(!kit){ return cb(null, {});}

        Kit.remove(kit=>{ return cb(null, kit);
        })
        .catch(err=>{ return cb(err);
        });
    });
};

/**
 * update a kit
 *
 * @desc  update data of the kit with the given id
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = (query, updates,cb)=>{
    debug('updating kit:', query);

    var now = moment().toISOString();
    updates.last_modified = now;

    var Promise = Kit.findOneAndUpdate(query, updates, returnFields).exec()
    .then(kit=>{ return cb(null, kit || {});
    })
    .catch(err=>{ return cb(err);
    });
};

/**
 * get a kit.
 *
 * @desc get a kit with the given id from db
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = (query, cb)=>{
    debug('fetching kit:', query);

    var Promise =Kit.findOne(query, returnFields).exec()
    .then(kit=>{ return cb(null, kit || {});
    })
    .catch(err=>{ return cb(err);
    });
};

/**
 * get a collection of kits
 *
 * @desc get a collection of kits from db
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = (query, cb)=>{
    debug('Fetching a collection of kits');

    var Promise = Kit.find(query, returnFields).exec()
    .then(kits=>{ return cb(null, kits);
    })
    .catch(err=>{ return cb(err);
    });
}; 

/**
 * Get a collection of kits by pagination
 * 
 * @desc Get a collection of kits from the database by pagination
 * @param {object} query  Query object
 * @param {object} opts  options object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollectionByPagination = function getCollection(query, opts, cb) {
  debug('fetching a collection of kits');
  var opts = {
    columns:  returnFields,
    sortBy:   opts.sort || {},
    page:     opts.page,
    limit:    opts.limit
  };
  Kit.paginate(query, opts, function (err, docs, page, count) {
    if(err) { return cb(err);}
    var data = {
      total_pages: page,
      total_docs_count: count,
      docs: docs
    };
    cb(null, data);
  });
};