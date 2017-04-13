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
    debug('search run by location');
    if(req.query.search){
        var regex = new RegExp(escapeRegExp(req.query.search), 'gi');
        var query = {location:regex};
            runDal.getCollection(query, function getRunsCollections(err, runs){
                if(err){
                    return next(err);
                }
                res.json(runs);
            });
        }
    };
function escapeRegExp(string){
  return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

/**
 * Send invites
 */
exports.sendInvite = function sendInvite(req, res, next){
    debug('sending invite');

    var body = req.body;
    // var workflow = new EventEmitter();

    workflow.on('validateInvitation', function validateInvitation(){
        debug('still sending yall');
        req.checkBody('invitee','invitee id is empty').notEmpty();

        var errs = req.validationErrors();
        if(errs){
            res.status(404);
            res.json(errs);
        }else{
            workflow.emit('createInvitation');

        }
    });
    workflow.on('createInvitation', function createInvitation(){

        var body = req.body;
        var query = {_id: req.params._id};

        inviteDal.create({invitee:req.body.invitee}, function done(err, invite){
            if(err){ return next(err);}

            inviteDal.get(query, function getcb(err, invite){
                if (err) { return next(err);}

            profileDal.update({_id:body.invitee}, {$addToSet:{runs_invited:run._id}}, function updatecb1(err, profile){
                if(err){ next(err);}

                inviteDal.update({_id:run._id},{$addToSet:{invitee:body.invitee}}, function updatecb2(err, invite){
                    if(err){ return next(err);}

                    res.json(profile);
                });
            });
        });
    })
});
workflow.emit('validateInvitation');
};

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

/**
 * Get calories lost
 *
 * @desc Get calories lost per run
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 *
 * Requirements to calculate calories lost
 * 1.distance (end_point-starting_point)
 * 2.time (start_time - end_time)
 * 3.age
 * 4.heart rate
 * 5.gender
 *
 * if gender==='male'
 * var calories_burned = ([(age * 0.2017)+(weight * 0.09036) + (heart_rate * 0.6309)- 55.0969]* time /4.184);
 *
 * if gender==='female'
 * var calories_burned = [(age * 0.074)-(weight * 0.05741) + (heart_rate * 0.4472)- 20.4022]* time /4.184;
 *
 * var kcal_per_min = (calories_burned / time);
 */
exports.calculator = function calculator(req, res, next){
    debug('calculating calories lost');

    runDal.get({_id:req.params._id}, function getcb2(err, run){
        if(err){ return next(err);}

        profileDal.get({_id:req._user.profile}, function getcb(err, profile){
        if(err){ return next(err);}

        var age           = profile.age;
        var gender        = profile.gender;
        var weight        = profile.weight;
        var heart_rate    = profile.heart_rate;
        var start_time    = run.start_time;
        var end_time      = run.end_time;
        var starting_point= run.starting_point;
        var ending_point  = run.ending_point;
        var time_taken    = (end_time) - (start_time);
        var distance      = (ending_point) - (starting_point);

        if(age === undefined || gender ===undefined || heart_rate ===undefined || weight ===undefined){
            res.status(404);
            res.json({
                message:'please update your profile to complete this action'
            });
            return;
        }
            if(profile.gender ==='male'){
                var calories_burned = ([(age * 0.2017)+(weight * 0.09036) + (heart_rate * 0.6309)- 55.0969]* time_taken /4.184);
                var kcal_per_min = (calories_burned / time_taken);

                runDal.update({_id:req.params._id}, {$set:{calories_burned:calories_burned, kcal_per_min:kcal_per_min }}, function done(err, run){
                    if(err){ return next(err);}

                    res.json(run);
                });
                return;
            }else{
                if(profile.gender ==='female'){
                    var calories_burned = ([(age * 0.074)-(weight * 0.05741) + (heart_rate * 0.4472)- 20.4022]* time_taken /4.184);
                    var kcal_per_min = (calories_burned / time_taken);

                    runDal.update({_id:req.params._id}, {$set:{calories_burned:calories_burned, kcal_per_min:kcal_per_min}}, function done(err, run){
                        if(err){ return next(err);}

                        res.json(run);
                    });
                };
            };
        });
    });
};

/**
 * Get distance covered
 *
 * @desc Get distance covered per run
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.getDistanceCovered = function getDistanceCovered(req, res, next){
    debug('Get distance covered on run:', req.params._id);

    var query = {_id:req.params._id};

    runDal.get(query, function getcb(err, run){
        if(err){ return next(err);}

        workflow.on('distance', function distance(lat1, long1, lat2,long2){
            var long1 = run.starting_point.long;
            var lat1  = run.starting_point.lat;
            var long2 = run.ending_point.long;
            var lat2  = run.ending_point.lat;

            var radlat1  = Math.PI * lat1 / 180;
            var radlat2  = Math.PI * lat2/180;
            var theta    = long1-long2;
            var radtheta = Math.PI * theta/180;
            var dist     = Math.sin(radlat1)*Math.sin(radlat2)+Math.cos(radlat1)*Math.cos(radlat2)*Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist *60 * 1.1515;
            dist = dist * 1.609344;

            runDal.update(query, { $set:{distance:dist }}, function updatecb(err, run){
                if(err){ return next(err);}

                res.json(run);
            });
        });
        workflow.emit('distance');
    });
};
