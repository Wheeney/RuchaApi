/**
 * Load Module Dependencies
 */
var mongoose  = require('mongoose');
var paginator = require('mongoose-paginate');
var moment    = require('moment');

var Schema    = mongoose.Schema;

// Define athlete Schema
var athleteSchema = new Schema({
  name         : { type: String },
  age          : { type: String },
  gender       : { type: String },
  records      : { type: String },
  bio          : { type: String },
  medals       : { type: String },
  picture      : { type: String },
  last_modified: { type: String },
  date_created : { type: Date }
  
}, { versionKey: false });

/**
 * Model Attributes to expose
 */
athleteSchema.statics.whitelist = {
  name:1,
  age:1,
  gender:1,
  records:1,
  bio:1,
  medals:1,
  picture:1,
  date_created:1,
  last_modified:1
};

//Middleware to support pagination
athleteSchema.plugin(paginator);

/**
 * Pre save middleware.
 *
 * @desc Sets the date_created and last_modified attributes prior to save.
 * @param {next} next middleware dispatcher
 */
athleteSchema.pre('save', function preSaveMiddleware(next) {
  var athlete = this;

  // set date modifications
  var now = moment().toISOString();

  athlete.date_created = now;
  athlete.last_modified = now;

  next();

});

// Export athlete Model
module.exports = mongoose.model('Athlete', athleteSchema);