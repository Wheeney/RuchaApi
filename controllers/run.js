'use strict'
/**
 * Load module dependencies
 */
var EventEmitter = require('events').EventEmitter;
var moment       = require('moment');
var debug        = require('debug')('api:controller-run');

var userDal      = require('../dal/user');
var runDal       = require('../dal/run');
var profileDal   = require('../dal/profile');
var inviteDal    = require('../dal/invite');

 var workflow    = new EventEmitter();

/**
 * Create a run
 *
 * @desc create a run and save it in the db
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.createRun = (req, res, next)=>{
    debug('creating a run');

    var body = req.body;

    //validate the run
    workflow.on('validateRun', function validateRun(){
        debug('validating run');

        req.checkBody('name', 'Name is empty').notEmpty().withMessage('name is invalid');
        req.checkBody('location', 'Location is empty').notEmpty();
        req.checkBody('scheduled_date', 'scheduled_date invalid').isDate();
        req.checkBody('visibility', 'Please select public or private').notEmpty().isIn(['public','private']);

        var validationErrors = req.validationErrors();
        if(validationErrors){
            res.status(400);
            res.json(validationErrors);
        } else{
             workflow.emit('createRun');
        };
    });
    console.log(req._user);
    workflow.on('createRun', function createRun(){
        
        profileDal.get({_id:req._user.profile}, function getcb(err, profile){
            if(err){ return next(err);}
            
            runDal.create({
                name          :body.name,
                location      :body.location,
                scheduled_date:body.scheduled_date,
                visibility    :body.visibility,
                creator       :profile.first_name
            }, function cb(err, run){
                if(err){ return next(err);};
                
                // if(body.visibility ==='public'){
                //     res.send('Only'+body.limit+'members are allowed');
                // }
                profileDal.update({_id:req._user.profile},{ $addToSet:{runs_created:run._id} }, function updatecb(err, profile){
                    if(err){ return next(err);}

                    workflow.emit('respond', run);
                    return;
                });
            });
        });
    });
    workflow.on('respond', function respond(run){
        res.status(201);
        res.json(run);
    });
    workflow.emit('validateRun');
};

/**
 * Get one run
 *
 * @desc Fetch a single run from the database by Id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.getRun =(req, res, next)=>{
    debug('Fetching a run:', req.params._id);

    var query = { _id:req.params._id };

    runDal.get(query, function getcb(err, run){
        if (err) { return next(err);}
        res.json(run);
    });
};

/**
 * delete a single run
 *
 * @desc delete a single run from the database by Id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.removeRun =(req, res,next)=>{
     debug('deleting run:', req.params._id);

    var query = { _id:req.params._id };

    runDal.delete(query, function deletecb(err, run){
        if(err) { return next(err);}
        res.json(run);
    });
};

/**
 * update a  run
 *
 * @desc update a single run from the database by Id
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.updateRun =(req, res, next)=>{
    debug('updating run:', req.params._id);

    var query = { _id:req.params._id };
    var body  = req.body;

    runDal.update(query, body, function updatecb(err, run){
        if (err) { return next(err);}
        res.json(run);
    });
};

/**
 * get all runs
 *
 * @desc Fetch all runs from the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.getRuns = (req, res, next)=>{
    debug('Fetching all runs');
    if(req.query.search){
        var regex = new RegExp(escapeRegex(req.query.search), 'gi');
        var query = {location: regex};

        runDal.getCollection(query, function getRunCollections(err, runs){
            if(err){ 
                return next(err);
            }else{
                if(runs.length<1){
                    res.status(404);
                    res.json({ 
                        message:'No match found with specified keyword'
                    });
                }
            }
            res.json(runs);
        });
    }else{
        var query = {};

        runDal.getCollection(query, function getRunCollections(err, runs){
            if(err){ return next(err);}
            res.json(runs);
        });
    };
};

function escapeRegex(text){
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");
}



/**
 * get all public runs
 *
 * @desc Fetch all public runs from the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.getPublicRuns =(req, res, next)=>{
    debug('Fetching all open runs');

    var query = {visibility:'public'};

    runDal.getCollection(query, function getRunCollections(err, runs){
        if(err){ return next(err);}
        res.json(runs);
    });
};

/**
 * Get One public run
 *
 * @desc Get one public run from the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.getOnePublicRun =(req, res, next)=>{
    debug('Fetching one public run:', req.params._id);

    var query = { _id:req.params._id };

    runDal.get(query, function getcb(err, run){
        if (err) { return next(err);}
        res.json(run);
    });
};

/**
 * Fetch all participants of a specific run
 *
 * @desc Get all participants of the same run from the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.getParticipants = function getParticipants(req, res, next){
    debug('Fetching all participants of run:', req.params._id);

    var query = {_id:req.params._id};

    runDal.getParticipants(query, function getRunParticipants(err, runs){
        if(err){ return next(err); }
        res.json(runs);
    });
};


/**
 * Join a run
 *
 * @desc Follow a particular run
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.joinRun = function joinRun(req, res, next){
    debug('joining run:', req.params._id);

    var query     = {_id:req.params._id};
    var profileId = req._user.profile;

    runDal.get(query, function getcb(err, run){
        if (err){ return next(err);}

        profileDal.update({_id:profileId}, { $addToSet:{ runs_joined:query}}, function updatecb(err, profile){
            if(err){ return next(err);}

            runDal.update(query, { $addToSet:{ participants:profileId}}, function updatecb2(err, run){
                if (err){ return next(err);}

                res.json(run);
            });
        });
    });
};

/**
 * Unfollow a run
 *
 * @desc unfollow a particular run
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.unfollowRun = function unfollowRun(req, res, next){
    debug('controller:unfollowing run:', req.params._id);

        var query     = {_id:req.params._id};
        var profileId = req._user.profile;

        runDal.get(query, function getcb(err, run){
            if(err){ return next(err);}

            profileDal.update({_id:profileId}, { $pull:{ runs_joined:run._id}}, function updatecb(err,profile){
                if(err){ return next(err);}

                runDal.update(query, { $pull:{ participants:profileId}}, function updatecb2(err, run){
                if (err){ return next(err);}

                res.json(run);
            });
        });
    });
};

/**
 * Get all participants of a run
 *
 * @desc Get participants of a specific run
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.getParticipants = (req, res, next)=>{
    debug('get participants of run:', req.params._id);

    var query = { _id:req.params._id};
    runDal.get(query, function done(err, run){
        if(err){ return next(err);}
        res.json(run.participants);
    });
}


/**
 * Search by location
 *
 * @desc Search for a run by location
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.search = function search(req, res, next){
    if(req.query.search){

        var regex = new RegExp(escapeRegExp(req.query.search), 'gi');
        var query = {location:regex};
            runDal.getCollection(query, function getRunsCollections(err, runs){
                if(err){return next(err);}

                res.json(runs);
            });
        }
    };
function escapeRegExp(string){
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}


/**
 * geocoding for starting_point and ending_point
 */
exports.geocode = function geocode(req, res, next){
    debug('Getting coordiates of starting_point and ending_point' );

    runDal.get({_id:req.params._id}, function getcb(err, run){
        if(err){ return next(err);}

        res.json(run.starting_point+','+run.ending_point);
    });
};

