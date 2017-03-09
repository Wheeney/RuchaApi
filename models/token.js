// Load Module Dependencies
var mongoose  = require('mongoose');

var Schema  = mongoose.Schema;

// Define Token Attributes
var tokenSchema = new Schema({
  value        : { type: String },
  revoked      : { type: Boolean, default: true },
  user         : { type: Schema.Types.ObjectId, ref: 'User' },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  expires      : { type: Date },
  date_created : { type: Date },
  last_modified: { type: Date }
}, { versionKey: false });

tokenSchema.statics.attributes = {
  value:0,
  resetPasswordToken:0,
  resetPasswordExpires:0,
};

// Export Token Model
module.exports = mongoose.model('Token', tokenSchema);

