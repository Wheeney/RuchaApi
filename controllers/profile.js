// Load Module Dependencies

var debug      = require('debug')('rucha-api');
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
 * @desc Get a collection of users
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
 * Get users coordinates(lat, long)
 * 
 * @desc Get all the runs joined by a apecific user
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.getCoordinates = (req, res, next)=>{
    debug('Getting users coordinates');
    
    profileDal.get({_id:req.params._id}, function getcb(err, profile){
        if(err){ return next(err);}
        
        var query = profile.city;
        request('https://maps.googleapis.com/maps/api/geocode/json?address='+query+'&key=AIzaSyDlweacuTHT3rxacwQGYdvotc1yKd2Bs7g', function (err, response, body) {
            if (!err && response.statusCode == 200) {
                console.log(body);
                res.send(body); 
            }
        });
    });
};

/**
 * Accept invitation
 */
exports.acceptInvite = function acceptInvite(req, res, next){
    debug('accept invitation');
    
    if(run_invitation.length = 0){
        return;
    }else{
        inviteDal.update({_id:invite._id}, {$pull:{pendingInvites:body.pendingInvites}, $addToSet:{acceptedInvites:body.acceptedInvites}}, function updatecb(err, invite){
            if(err){ return next(err);}
            
            profileDal.update({_id:profile._id}, {$pull:{run_invitation:body.run_invitation}, $addToSet:{runs_joined:body.runs_joined}}, function updatecb2(err, profile){
                if(err){ return next(err);}

                res.json(profile);
            })
        })
    }
    
}


