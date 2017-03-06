// Load Module Dependencies
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define Profile Schema
var ProfileSchema = new Schema({
  user          : { type: Schema.Types.ObjectId, ref: 'User' },
  runs_joined   : [{ type: Schema.Types.ObjectId, ref: 'Run' }],
  runs_created  : [{ type: Schema.Types.ObjectId, ref: 'Run' }],
  picture       : { type: String },
  first_name    : { type: String },
  last_name     : { type: String },
  email         : { type: String, unique:true },
  date_of_birth : { type: Date },
  city          : { type: String },
  country       : { type: String },
  address       : { type: String },
  gender        : { type: String },
  weight        : { type: Number },
  date_created  : { type: Date },
  last_modified : { type: Date }
  
}, { versionKey: false });


// Export Profile Model
module.exports = mongoose.model('Profile', ProfileSchema);