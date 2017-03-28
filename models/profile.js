// Load Module Dependencies
var mongoose = require('mongoose');
var paginator = require('mongoose-paginate');
var moment = require('moment');

var Schema = mongoose.Schema;

// Define Profile Schema
var ProfileSchema = new Schema({
  user          : { type: Schema.Types.ObjectId, ref: 'User' },
  runs_joined   : [{ type: Schema.Types.ObjectId, ref: 'Run' }],
  runs_created  : [{ type: Schema.Types.ObjectId, ref: 'Run' }],
  runs_invited  : [{ type: Schema.Types.ObjectId, ref: 'Invite'}],
  first_name    : { type: String },
  last_name     : { type: String },
  email         : { type: String, unique:true },
  date_of_birth : { type: Date },
  age           : { type: Number},
  heart_rate    : { type: String},
  gender        : { type: String},
  weight        : { type: Number},
  city          : { type: String },
  country       : { type: String },
  address       : { type: String },
  gender        : { type: String },
  weight        : { type: Number },
  date_created  : { type: Date },
  last_modified : { type: Date }
  
}, { versionKey: false });

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