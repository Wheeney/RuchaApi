/**
 * Load module dependencies
 */
var debug  = require('debug')('rucha-api');
var moment = require('moment');
var User   = require('../models/user');
var population = [{path:'profile'}];
var returnFields = User.attributes;

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
            return cb(new Error('User already exists!'));
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
 * 
 * @desc delete data of the user with the given id
 * @param {object} query  Query object
 * @param {function} cb  callback for once delete is complete 
 */
exports.delete = (query, cb)=>{
    debug('deleting user:', query);

    var Promise = User.findOne(query, returnFields).populate(population).exec()
    .then(user=>{
        if(!user){ return cb(null, {});}

        user.remove(user=>{ return cb(null, user);
        })
        .catch(err=>{
            return cb(err);
        });
    });
};
/**
 * update a user
 * 
 * @desc update data of a user with a given id 
 * @param {object} query  Query object
 * @param {object} updates update data
 * @param {function} cb  callback for once update is complete
 */
exports.update = (query, updates,cb)=>{
    debug('updating user:', query);

    var now = moment().toISOString();
    updates.last_modified = now;

    var Promise = User.findOneAndUpdate(query, updates, returnFields).populate(population).exec()
    .then(user=>{ return cb(null, user || {});
    })
    .catch(err=>{ return cb(err);
    });
};

/**
 * Get a user
 * 
 * @desc get a user with a specific id from db 
 * @param {object} query  Query object
 * @param {function} cb  callback for once fetch is complete
 */
exports.get = (query, cb)=>{
    debug('fetching user:', query);

    var Promise =User.findOne(query, returnFields).populate(population).exec()
    .then(user=>{ return cb(null, user || {});
    })
    .catch(err=>{ return cb(err);
    });
};
    
/**
 * Get a collection of users
 * 
 * @desc Get a collection of users from the database
 * @param {object} query  Query object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = (query, cb)=>{
    debug('Fetching a collection of users');

    var Promise = User.find(query, returnFields).populate(population).exec()
    .then(users=>{ return cb(null, users);
    })
    .catch(err=>{ return cb(err);
    });
};

