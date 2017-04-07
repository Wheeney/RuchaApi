// Load Module Dependencies

var debug      = require('debug')('api:controller-profile');
var request    = require('request');

var profileDal = require('../dal/profile');

/**
 * Get Profile
 * 
 * @desc Get the profile of a specific user
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.getProfile = function getProfile(req, res, next) {
  debug('Fetching user profile:', req.params._id);

    var query = { _id:req.params._id };

   profileDal.get(query, function getcb(err, profile){
        if (err) { return next(err);}

        res.json(profile);
    });

};


/**
 * Update Profile
 * 
 * @desc Update the profile a apecific user
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.updateProfile = function updateProfile(req, res, next) {
  debug('updating user profile:', req.params._id);

    var query = { _id:req.params._id };
    var body  = req.body;

    profileDal.update(query, body, function updatecb(err, profile){
        if (err) { return next(err);}

        res.json(profile);
    });
};

/**
 * Get Profiles
 * 
 * @desc Get a collection of profiles
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.getProfiles = function getProfiles(req, res, next) {
  debug('Fetching all user profiles');

    var query = {};
    profileDal.getCollection(query, function getprofileCollections(err, profiles){
        if(err){
            return next(err);
        }
        res.json(profiles);
    });
};

/**
 * Get all runs joined by a user
 * 
 * @desc Get all the runs joined by a apecific user
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.getRunsJoined = (req, res, next)=>{

    var query = { _id:req.params._id};
    profileDal.get(query, function done(err, profile){
        if(err){ return next(err);}
        res.json(profile.runs_joined);   
    });
};

/**
 * Get all runs created by a user
 */
exports.getRunsCreated = (req, res, next)=>{
    debug('Get all runs created by user:', req._user._id);

    var query = {_id:req.params._id};

    profileDal.get(query, function done(err, profile){
        if(err){ return next(err);}
        res.json(profile.runs_created);
    });
};

/**
 * Get a collection of profiles by pagination
 * 
 * @desc Get a collection of profiles from the database by pagiation
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.fetchAllByPagination = function fetchAllProfiles(req, res, next) {
  debug('get a collection of profiles by pagination');

  // retrieve pagination query params
  var page   = req.query.page || 1;
  var limit  = req.query.per_page || 10;

  var opts = {
    page: page,
    limit: limit
  };
  var query = {};

  profileDal.getCollectionByPagination(query, opts, function cb(err, profiles) {
    if(err) {
      return next(err);
    }
    res.json(profiles);
  });
};
