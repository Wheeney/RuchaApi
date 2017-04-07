
/**
 * Load Module Dependencies.
 */
var debug      = require('debug')('api:dal-cashier');
var moment     = require('moment');

var Cashier    = require('../models/cashier');

var population = [{path: 'profile'},{path: 'transaction'},{path:'product'}, { path:'user'}];

/**
 * create a new cashier.
 *
 * @desc  creates a new cashier and saves them
 *        in the database
 *
 * @param {Object}  cashierData  Data for the cashier to create
 * @param {Function} cb  Callback for once saving is complete
 */
exports.create = function create(cashierData, cb) {
  debug('creating a new cashier');

  // Create cashier
  var cashierModel  = new Cashier(cashierData);

  cashierModel.save(function saveCashier(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, cashier) {
      if(err) {
        return cb(err);
      }

      cb(null, cashier);

    });

  });

};

/**
 * delete a cashier
 *
 * @desc  delete data of the cashier with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting cashier: ', query);

  Cashier
    .findOne(query)
    .populate(population)
    .exec(function deleteCashier(err, cashier) {
      if (err) {
        return cb(err);
      }

      if(!cashier) {
        return cb(null, {});
      }

      cashier.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, cashier);

      });

    });
};

/**
 * update a cashier
 *
 * @desc  update data of the cashier with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating cashier: ', query);

  var now = moment().toISOString();

  updates.last_modified = now;

  Cashier
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateCashier(err, cashier) {
      if(err) {
        return cb(err);
      }

      cb(null, cashier || {});
    });
};

/**
 * get a cashier.
 *
 * @desc get a cashier with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting cashier ', query);

  Cashier
    .findOne(query)
    .populate(population)
    .exec(function(err, cashier) {
      if(err) {
        return cb(err);
      }

      cb(null, cashier || {});
    });
};

/**
 * get a collection of cashiers
 *
 * @desc get a collection of cashiers from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of cashiers');

  Cashier
    .find(query)
    .populate(population)
    .exec(function getCashiersCollection(err, cashiers) {
      if(err) {
        return cb(err);
      }

      return cb(null, cashiers);
  });

};