/**
 * Load module dependencies
 */
var EventEmitter = require('events').EventEmitter;
var moment       = require('moment');
var debug        = require('debug')('rucha-api');
var userDal      = require('../dal/user');
var runDal       = require('../dal/run');
var profileDal   = require('../dal/profile');

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
    var workflow = new EventEmitter();

    //validate the run
    workflow.on('validateRun', function validateRun(){
        debug('validating run');

        req.checkBody('name', 'Name is empty').notEmpty();
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
    workflow.on('createRun', function createRun(){
        //create run data
        runDal.create({
            name:body.name,
            location:body.location,
            scheduled_date:body.scheduled_date,
            visibility:body.visibility,
            date_created:Date.now(),
            last_modified:Date.now()

        }, function cb(err, run){
            if(err){
                return next(err);
            };
            workflow.emit('respond', run);                
            
        });
    });

//     workflow.on('saveRun', function saveRun(run){
//         debug('save newly created game:', run._id);

//         profileDal.get({_id:req.params._id}, function(err, profile){
//             if(err){ return next(err);}

//             profileDal.update({ _id:profile._id}, { runs_created:run._id}, function updatecb(err, profile){
//             if(err){ return next(err);}

//             workflow.emit('respond', run);
//         });
//     });
// });

    workflow.on('respond', function respond(run){
        res.status(201).json(run);
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

    var query = {};
    
    runDal.getCollection(query, function getRunCollections(err, runs){
        if(err){
            return next(err);
        }
        res.json(runs);
    });
};

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

    var query = {};
    
    runDal.getCollection(query, function getRunCollections(err, runs){
        if(err){
            return next(err);
        }
        res.json(runs);
    })
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
 * Fetch all followers of a specific run
 * 
 * @desc Get all followers of the same run from the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.getFollowers = function getFollowers(req, res, next){
    debug('Fetching all followers of run:', req.params._id);

    var query = {_id:req.params._id};
    
    runDal.getFollowers(query, function getRunFollowers(err, runs){
        if(err){
            return next(err);
        }
        res.json(runs);
    })
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

    var query = {_id:req.params._id};
    var workflow = new EventEmitter();

    workflow.on('validateFollower', function validateFollower(){
        debug('get me the follower profile id');
        
        req.checkBody('followers','follower id is empty').notEmpty();

        var errs = req.validationErrors();
        if(errs){
            res.status(404);
            res.json(errs);
        }else{
            workflow.emit('joinRun');

        }     
    });
    workflow.on('joinRun', function joinRun(){

        var body = req.body;
        runDal.create({followers:req.body.followers}, function done(err, run){
            if(err){ return next(err);}

            runDal.get(query, function getcb(err, run){
                if (err) { return next(err);}

            profileDal.update({_id:body.followers}, {$addToSet:{runs_joined:run._id}}, function updatecb1(err, profile){
                if(err){ next(err);}

                runDal.update({_id:run._id},{$addToSet:{followers:body.followers}}, function updatecb2(err, run){
                    if(err){ return next(err);}

                    res.json(run);
                });
            });
    });
})
    })
    workflow.emit('validateFollower');
     

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

    var workflow = new EventEmitter();

    workflow.on('validateFollower', function validateFollower(){
        debug('validating user:', req.params._id);

        req.checkBody('followers','id is empty').notEmpty();

        var errs = req.validationErrors();
        if(errs){
            res.status(404);
            res.json(errs);
        }else{
            workflow.emit('unfollowRun');
        }
    });

    workflow.on('unfollowRun', function unfollowRun(){

        var query = {_id: req.params._id};
        var body = req.body;

    runDal.create({followers:req.body.followers}, function done(err, run){
            if(err){ return next(err);}        

    runDal.get(query, function unfollowcb(err, run){
        if(err){ return next(err);}

        profileDal.update({_id:body.followers}, { $pull:{runs_joined:run._id}}, function updatecb3(err, profile){
            if(err){ return next(err);}

            runDal.update({_id:run._id}, {$pull:{followers:body.followers}}, function updatecb4(err, run){
                if(err){ return next(err);}

                res.json(run);
            });
        });
    });

    })
    });

    workflow.emit('validateFollower');
};
/**
 * Get all followers of a run
 */
exports.getFollowers = (req, res, next)=>{
    debug('get followers of run:', req.params._id);

    var query = { _id:req.params._id};

    runDal.get(query, function done(err, run){
        if(err){ return next(err);}

        runDal.getCollection()
    });
}
