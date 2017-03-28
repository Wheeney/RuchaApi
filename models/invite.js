// Load Module Dependencies
var mongoose = require('mongoose');
var paginator = require('mongoose-paginate');
var moment = require('moment');

var Schema = mongoose.Schema;

var inviteSchema = new Schema({
    run     :{ type: Schema.Types.ObjectId, ref:'Run'},
    invitees:[{ type: Schema.Types.ObjectId, ref:'Profile'}],
    date_created  : { type: Date },
    last_modified : { type: Date }

}, { versionKey: false });

//Middleware to support pagination
inviteSchema.plugin(paginator);

/**
 * Pre save middleware.
 *
 * @desc Sets the date_created and last_modified attributes prior to save.
 * @param {next} next middleware dispatcher
 */
inviteSchema.pre('save', function preSaveMiddleware(next) {
  var invite = this;

  // set date modifications
  var now = moment().toISOString();

  invite.date_created = now;
  invite.last_modified = now;

  next();

});

// Export Invite Model
module.exports = mongoose.model('Invite', inviteSchema);