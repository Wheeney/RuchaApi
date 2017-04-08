//Load module dependencies
var EventEmitter = require('events').EventEmitter;
var debug        = require('debug')('api:controller-invite');
var moment       = require('moment');

var config       = require('../config');
var userDal      = require('../dal/user');
var runDal       = require('../dal/run');
var inviteDal    = require('../dal/invite');
var profileDal   = require('../dal/profile');

/**
 * create an invite
 * 
 * @desc create an invite and store it in the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher
 */
exports.createInvite = function createInvite(req, res, next){
    debug('creating an invite');

    var workflow = new EventEmitter();
    var body = req.body;

    workflow.on('createInvite', function createInvite(){
        inviteDal.create({
            run     :body.run,
            invitees:body.invitees
            }, function createcb(err, invite){
            if(err) { return next(err);}
            
            var query = req.body.invitees;
            
                profileDal.update({_id:query }, { $set:{runs_invited:invite._id}},{ multi:true }, function updatecb(err, profile){
                if(err){ return next(err);}

                runDal.update({_id:req.body.run}, { $addToSet:{pendingInvites:query}}, function updatecb2(err, run){
                    if(err){ return next(err);}

                    workflow.emit('respond', invite);
                });    
            });
        });
    });

    workflow.on('respond', function respond(invite){
        res.status(201).json(invite);
    });
    workflow.emit('createInvite');
};

/**
 * Get an invite
 * 
 * @desc Fetch a single invite from the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.fetchInvite = (req, res, next) => {
    debug('Fetching invite:', req.params._id);

    var query = { _id: req.params._id };

    inviteDal.get(query, function getcb(err, invite) {
        if (err) { return next(err); }

        res.json(invite);
    });
};

/**
 * Update invite
 * 
 * @desc Get a single invite from the database and update it.
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.updateInvite = (req, res, next) => {
    debug('updating invite:', req.params._id);

    var query = { _id: req.params._id };
    var body = req.body;

    inviteDal.update(query, body, function updatecb(err, invite) {
        if (err) { return next(err); }

        res.json(invite);
    });
};

/**
 * delete an invite
 * 
 * @desc Get a single invite from the database and delete it
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.deleteInvite = (req, res, next) => {
    debug('deleting invite:', req.params._id);

    var query = { _id: req.params._id };

    inviteDal.delete(query, function deletecb(err, invite) {
        if (err) { return next(err); }

        res.json(invite);
    });
};

/**
 * Get a collection of invites
 * 
 * @desc Get a collection of invites from the database
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.getInvites = (req, res, next) => {
    debug('Fetching all invites');

    var query = {};

    inviteDal.getCollection(query, function getInviteCollections(err, invites) {
        if (err) { return next(err); }

        res.json(invites);
    });
};

/**
 * Accept invitation.
 * 
 * @desc Accept invitation to profile.
 * @param {object} req HTTP request object
 * @param {object} res HTTP response object
 * @param {function} next middleware dispatcher 
 */
exports.acceptInvite = function acceptInvite(req, res, next){
    debug('accept invite:', req.params._id);
    
    var body = req.body;
    var workflow = new EventEmitter();
    
    workflow.on('getInvite', function getInvite(){
        
        inviteDal.get({_id:req.params._id}, function getcb(err, invite){
            if(err){ return next(err);}
            
            profileDal.update({_id:body.invitees}, {runs_joined:req.body.run_invitation}, function cb(err,profile){
                if(err){ return next(err);}

                res.json(profile);
            });
        });
    });
    workflow.emit('getInvite');
};
/**
 * Join invited run
 */
exports.joinInvitedRun = function joinInvitedRun(req, res, next){
    debug('join invite:', req.params._id);

    var query = {_id:req.params._id};
    
}