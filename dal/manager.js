
/**
 * Load Module Dependencies.
 */
var debug      = require('debug')('super-api');
var moment     = require('moment');

var Manager      = require('../models/manager');

var population = [{ path: 'profile' },{ path:'product' }];

/**
 * create a new manager.
 *
 * @desc  creates a new manager and saves them
 *        in the database
 *
 * @param {Object}  managerData  Data for the manager to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(managerData, cb) {
  debug('creating a new manager');

  // Create manager
  var managerModel  = new Manager(managerData);

  managerModel.save(function saveManager(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, manager) {
      if(err) {
        return cb(err);
      }

      cb(null, manager);

    });

  });

};

/**
 * delete manager
 *
 * @desc  delete data of the manager with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting manager: ', query);

  Manager
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteManager(err, manager) {
      if (err) {
        return cb(err);
      }

      if(!manager) {
        return cb(null, {});
      }

      manager.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, manager);

      });

    });
};

/**
 * update a manager
 *
 * @desc  update data of the manager with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating manager: ', query);

  var now = moment().toISOString();

  updates.last_modified = now;

  Manager
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateManager(err, manager) {
      if(err) {
        return cb(err);
      }

      cb(null, manager || {});
    });
};

/**
 * get a manager.
 *
 * @desc get a manager with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting manager ', query);

  Manager
    .findOne(query)
    .populate(population)
    .exec(function(err, manager) {
      if(err) {
        return cb(err);
      }

      cb(null, manager || {});
    });
};

/**
 * get a collection of managers
 *
 * @desc get a collection of managers from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of managers');

  Manager
    .find(query)
    .populate(population)
    .exec(function getManagersCollection(err, managers) {
      if(err) {
        return cb(err);
      }

      return cb(null, managers);
  });

};