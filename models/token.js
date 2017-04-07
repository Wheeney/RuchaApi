/**
 * Load Module Dependencies
 */
var mongoose  = require('mongoose');
var paginator = require('mongoose-paginate');
var moment    = require('moment');

var Schema    = mongoose.Schema;

// Define Token Attributes
var tokenSchema = new Schema({
  value            : { type: String },
  revoked          : { type: Boolean, default: true },
  user             : { type: Schema.Types.ObjectId, ref: 'User' },
  resetToken       : { type: String, required:false},
  resetTokenExpires: { type: Date },
  date_created     : { type: Date },
  last_modified    : { type: Date }
}, { versionKey    : false });

/**
 * Model Attributes to expose
 */
tokenSchema.statics.whitelist = {
  _id: 1,
  value: 1,
  revoked: 1,
  user: 1,
  date_created: 1
};

/**
 * Pre save middleware.
 *
 * @desc Sets the date_created and last_modified attributes prior to save.
 */
tokenSchema.pre('save', function preSaveMiddleware(next) {
  var token = this;

  // set date modifications
  var now = moment().toISOString();

  token.date_created = now;
  token.last_modified = now;

  next();

});

// Export Token Model
module.exports = mongoose.model('Token', tokenSchema);

