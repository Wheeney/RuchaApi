/**
 * Load Module Dependencies
 */
var mongoose  = require('mongoose');
var paginator = require('mongoose-paginate');
var moment    = require('moment');

var Schema    = mongoose.Schema;

// Define Profile Schema
var ProfileSchema = new Schema({
  user           : { type: Schema.Types.ObjectId, ref: 'User' },
  runs_created   : [{ type: Schema.Types.ObjectId, ref: 'Run'}],
  runs_joined    : [{ type: Schema.Types.ObjectId, ref: 'Run'}],
  pending_invitations: [{ type: Schema.Types.ObjectId, ref: 'Invite'}],
  quick_runs         : [{ type: Schema.Types.ObjectId, ref: 'QuickRun'}],
  first_name     : { type: String },
  last_name      : { type: String },
  email          : { type: String, unique:true, lowercase:true },
  age            : { type: String },
  gender         : { type: String},
  weight         : { type: Number},
  heart_rate     : { type: String},
  city           : { type: String },
  country        : { type: String },
  address        : { type: String },
  postalcode     : { type: String },
  date_created   : { type: Date }
  
}, { versionKey: false });

/**
 * Model Attributes to expose
 */
ProfileSchema.statics.whitelist = {
  user:1,
  first_name:1,
  last_name:1,
  email:1,
  date_of_birth:1,
  gender:1,
  city:1,
  country:1,
  address:1,
  postalcode:1,
  date_created:1,
  last_modified:1
};

//Middleware to support pagination
ProfileSchema.plugin(paginator);

/**
 * Pre save middleware.
 *
 * @desc Sets the date_created and last_modified attributes prior to save.
 * @param {next} next middleware dispatcher
 */
ProfileSchema.pre('save', function preSaveMiddleware(next) {
  var profile = this;

  // set date modifications
  var now = moment().toISOString();

  profile.date_created = now;
  profile.last_modified = now;

  next();

});

// Export Profile Model
module.exports = mongoose.model('Profile', ProfileSchema);