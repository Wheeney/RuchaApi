/**
 * Load module dependencies
 */
var debug      = require('debug')('api:dal-invite');
var moment     = require('moment');

var Invite     = require('../models/invite');
var population = [{ path:'profile'}, { path:'run'}];

/**
 * create a invite
 * 
 * @desc create a new invite and save the data in the database 
 * @param {object} inviteData  data for the invite being created.
 * @param {function} cb  callback for once the invite has been created
 */
exports.create = (inviteData, cb)=>{
    debug('Creating an invite');

    //create a new invite to send
    var newInvite = new Invite(inviteData);
    newInvite.save((err, invite)=>{
        if(err){ return cb(err); };
        debug('sending invite....');
        exports.get({_id: invite._id}, function(err, invite){
            if (err){ return cb(err) };
            cb(null, invite);
        });
    });
 };



/**
 * Delete a invite
 * 
 * @desc delete data of the invite with the given id 
 * @param {object} query  Query object
 * @param {function} cb  callback for once delete is complete
 */
exports.delete = (query, cb)=>{
    debug('deleting invite:', query);

    var Promise = Invite.findOne(query).populate(population).exec()
    .then(invite=>{
        if(!invite){ return cb(null, {});}

        invite.remove(invite=>{ return cb(null, invite);
        })
        .catch(err=>{ return cb(err);
        });
    });
};


/**
 * update a invite
 * @desc update data of a invite with a given id
 * 
 * @param {object} query  Query object
 * @param {object} updates update data
 * @param {function} cb  callback for once update is complete
 */
exports.update = (query, updates, cb)=>{
    debug('updating invite:', query);

    var now = moment().toISOString();
    updates.last_modified = now;

    var Promise = Invite.findOneAndUpdate(query, updates).populate(population).exec()
    .then(invite=>{ return cb(null, invite);
    })
    .catch(err=>{ return cb(err);
    });
};


/**
 * Get a invite
 * 
 * @desc get a invite with a specific id from db 
 * @param {object} query  Query object
 * @param {function} cb  callback for once fetch is complete
 */
exports.get = (query, cb)=>{
    debug('fetching invite:', query);

    var Promise = Invite.findOne(query).populate(population).exec()
    .then(invite=>{ return cb(null, invite || {});
    })
    .catch(err=>{ return cb(err);
    });
};


/**
 * Get a collection of invites
 * 
 * @desc Get a collection of invites from the database 
 * @param {object} query  Query object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = (query, cb)=>{
    debug('Getting a collection of invites');

    var Promise =Invite.find(query).populate(population).exec()
    .then(invites=>{ return cb(null, invites);
    })
    .catch(err=>{ return cb(err);
    });
};


