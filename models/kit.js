/**
 * Load Module Dependencies
 */
var mongoose  = require('mongoose');
var paginator = require('mongoose-paginate');
var moment    = require('moment');

var Schema    = mongoose.Schema;

// Define kit Schema
var kitSchema = new Schema({
  name         : { type: String },
  description  : { type: String },
  brand        : { type: String },
  image      : { type: String },
  last_modified: { type: String },
  date_created : { type: Date }
  
}, { versionKey: false });

/**
 * Model Attributes to expose
 */
kitSchema.statics.whitelist = {
  name:1,
  description:1,
  brand:1,
  image:1,
  date_created:1,
  last_modified:1
};

//Middleware to support pagination
kitSchema.plugin(paginator);

/**
 * Pre save middleware.
 *
 * @desc Sets the date_created and last_modified attributes prior to save.
 * @param {next} next middleware dispatcher
 */
kitSchema.pre('save', function preSaveMiddleware(next) {
  var kit = this;

  // set date modifications
  var now = moment().toISOString();

  kit.date_created = now;
  kit.last_modified = now;

  next();

});

// Export kit Model
module.exports = mongoose.model('Kit', kitSchema);