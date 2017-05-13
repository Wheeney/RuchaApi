
/**
 * Load Module Dependencies.
 */
var debug      = require('debug')('super-api');
var moment     = require('moment');

var Admin      = require('../models/admin');

var population = [{ path: 'profile' }];

/**
 * create a new admin.
 *
 * @desc  creates a new admin and saves them
 *        in the database
 *
 * @param {Object}  adminData  Data for the admin to create
 * @param {Function} cb       Callback for once saving is complete
 */
exports.create = function create(adminData, cb) {
  debug('creating a new admin');

  // Create admin
  var adminModel  = new Admin(adminData);

  adminModel.save(function saveAdmin(err, data) {
    if (err) {
      return cb(err);
    }


    exports.get({ _id: data._id }, function (err, admin) {
      if(err) {
        return cb(err);
      }

      cb(null, admin);

    });

  });

};

/**
 * delete admin
 *
 * @desc  delete data of the admin with the given
 *        id
 *
 * @param {Object}  query   Query Object
 * @param {Function} cb Callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb) {
  debug('deleting admin: ', query);

  Admin
    .findOne(query, returnFields)
    .populate(population)
    .exec(function deleteAdmin(err, admin) {
      if (err) {
        return cb(err);
      }

      if(!admin) {
        return cb(null, {});
      }

      admin.remove(function(err) {
        if(err) {
          return cb(err);
        }

        cb(null, admin);

      });

    });
};

/**
 * update a admin
 *
 * @desc  update data of the admin with the given
 *        id
 *
 * @param {Object} query Query object
 * @param {Object} updates  Update data
 * @param {Function} cb Callback for once update is complete
 */
exports.update = function update(query, updates,  cb) {
  debug('updating admin: ', query);

  var now = moment().toISOString();

  updates.last_modified = now;

  Admin
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateAdmin(err, admin) {
      if(err) {
        return cb(err);
      }

      cb(null, admin || {});
    });
};

/**
 * get a admin.
 *
 * @desc get a admin with the given id from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.get = function get(query, cb) {
  debug('getting admin ', query);

  Admin
    .findOne(query)
    .populate(population)
    .exec(function(err, admin) {
      if(err) {
        return cb(err);
      }

      cb(null, admin || {});
    });
};

/**
 * get a collection of admins
 *
 * @desc get a collection of admins from db
 *
 * @param {Object} query Query Object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb) {
  debug('fetching a collection of admins');

  Admin
    .find(query)
    .populate(population)
    .exec(function getAdminsCollection(err, admins) {
      if(err) {
        return cb(err);
      }

      return cb(null, admins);
  });

};