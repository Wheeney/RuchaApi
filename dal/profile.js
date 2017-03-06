/**
 * Load module dependencies
 */
var debug = require('debug')('rucha-api');
var moment = require('moment');

var Profile = require('../models/profile');

var population = [{ path:'user'}];

/**
 * create a profile
 * @desc create a new profile and save the data in the database
 * 
 * @param {object} profileData  data for the profile being created.
 * @param {function} cb  callback for once the profile has been created
 */
exports.create = function create(profileData, cb){
    debug('Creating a new profile');

    //create a new profile
    var newProfile = new Profile(profileData);

    newProfile.save(function saveProfile(err, profile){
        if(err){
            return cb(err);
        };

        exports.get({_id: profile._id}, function(err, profile){
            if (err){
                return cb(err)
            };
            cb(null, profile);
        });
        return;

    });
};

/**
 * Delete a profile
 * @desc delete data of the profile with the given id
 * 
 * @param {object} query  Query object
 * @param {function} cb  callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb){
    debug('deleting profile:', query);

    Profile
             .findOne(query)
             .populate(population)
             .exec(function deleteProfile(err, profile){
                 if(err){ return cb(err); }

                 if(!profile){
                     return cb(null, {});
                 };

                 profile.remove(function(err){
                     if(err){ return cb(err);}

                     cb(null, profile);
                 });
                 return;
             });
            };

/**
 * update a profile
 * @desc update data of a profile with a given id
 * 
 * @param {object} query  Query object
 * @param {object} updates update data
 * @param {function} cb  callback for once update is complete
 * 
 */
exports.update = function update(query, updates, cb){
    debug('updating profile:', query);
    
    var now = moment().toISOString();
    updates.last_modified = now;

    Profile
       .findOneAndUpdate(query, updates)
       .populate(population)
       .exec(function updateProfile(err, profile){
           if (err){ return cb(err);}

           cb(null, profile || {});
       });
};
/**
 * Get a profile
 * @desc get a profile with a specific id from db
 * 
 * @param {object} query  Query object
 * @param {function} cb  callback for once fetch is complete
 */
exports .get = function get(query, cb){
    debug('Fetching profile:', query);
    
    Profile
       .findOne(query)
       .populate(population)
       .exec(function fetchProfile(err, profile){
           if(err){ return cb(err);}
           cb(null, profile);
       });
};
/**
 * Get a collection of profiles
 * @desc Get a collection of profiles from the database
 * 
 * @param {object} query  Query object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb){
    debug('Getting a collection of profiles');
    Profile
       .find(query)
       .populate(population)
       .exec(function getProfilesCollection(err, profiles){
           if(err){ return cb(err);}
           cb(null, profiles);
       });
};


