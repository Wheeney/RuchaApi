// Load Module Dependencies

var debug = require('debug')('rucha-api');

var profileDal  = require('../dal/profile');


/**
 * Get Profile
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
 * Get runs joined
 * 
 * @desc Get all the runs joined by a apecific user
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.getRunsJoined = (req, res, next)=>{
    // debug('get participants of run:', req.params._id);

    var query = { _id:req.params._id};
    profileDal.get(query, function done(err, profile){
        if(err){ return next(err);}
        res.json(profile.runs_joined);   
    });
}