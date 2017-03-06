/**
 * Load module dependencies
 */
var debug  = require('debug')('rucha-api');
var moment = require('moment');
var User   = require('../models/user');
var Promise = require('bluebird');

var population = [{path:'profile'}];

/**
 * create a new user
 * 
 * @desc creates a new user and saves them in the database
 * @param {Object} userData  Data for the user to create
 * @param {Function} cb  Callback for once saving is complete
 */
exports.create = (userData, cb)=>{
    debug('creating a new user');
    
     var query = { username: userData.username}

    //verify that the user does not exist(using their email)
    User.findOne(query, function userExists(err, existingUser){
        if(err) { return next(err); };
        
        if(existingUser){
            return cb(new Error('User exists yawa!'));
        };

       //create new user if one does not exist
        var newUser = new User(userData);
        newUser.save(function saveUser(err, data){
            if(err){ return cb(err);}

            exports.get({_id: data._id}, function(err, user){
                if(err){ return cb(err);}

                cb(null, user);
            });
            
        });
    });
};

/**
 * Delete a user
 * @desc delete data of the user with the given id
 * 
 * @param {object} query  Query object
 * @param {function} cb  callback for once delete is complete
 * 
 */
exports.delete = function deleteItem(query, cb){
    debug('deleting user:', query);

    User    
        .findOne(query)
        .populate(population)
        .exec(function deleteUser(err, user){
            if(err){ return cb(err);}

            if(!user){
                return cb(null, {});
            }

            user.remove(function(err){
                if(err){ return next(err);}
                cb(null, user);
            });
            return;
        });
};
/**
 * update a user
 * @desc update data of a user with a given id
 * 
 * @param {object} query  Query object
 * @param {object} updates update data
 * @param {function} cb  callback for once update is complete
 * 
 */
exports.update = function update(query, updates, cb){
    debug('updating user:', query);
    
    var now = moment().toISOString();
    updates.last_modified = now;

    User
    .findOneAndUpdate(query, updates)
    .populate(population)
    .exec(function updateUser(err, user) {
      if(err) {
        return cb(err);
      }
      cb(null, user || {});
    });
    return;
};

/**
 * Get a user
 * @desc get a user with a specific id from db
 * 
 * @param {object} query  Query object
 * @param {function} cb  callback for once fetch is complete
 */
exports.get = function get(query, cb){
    debug('dal:Fetching user:', query);

   User
    .findOne(query)
    .populate(population)
    .exec(function(err, user) {
      if(err) {
        return cb(err);
      }

      cb(null, user || {});
    });
    return;
};
    
/**
 * Get a collection of users
 * @desc Get a collection of users from the database
 * 
 * @param {object} query  Query object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb){
    debug('Getting a collection of users');

    User
    .find(query)
    .populate(population)
    .exec(function getUsersCollection(err, users) {
      if(err) {
        return cb(err);
      }

      return cb(null, users);
  });
  return;
};

