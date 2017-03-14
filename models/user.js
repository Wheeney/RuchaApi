// Load Module Dependencies
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');
var moment   = require('moment');
var config   = require('../config');
var debug    = require('debug')('rucha-api');

var Schema  = mongoose.Schema;

// Define User Attributes
var UserSchema = new Schema({
  username       : { type: String, unique:true },
  password       : { type: String },
  confirmPassword: { type: String },
  newPassword    : { type: String },
  realm          : { type: String, default: 'user' },
  role           : { type: String },
  status         : { type: String, default: 'active' },
  profile        : { type: Schema.Types.ObjectId, ref: 'Profile' },
  last_login     : { type: Date },
  date_created   : { type: Date },
  last_modified  : { type: Date }
  
}, { versionKey: false });

// UserSchema.statics.attributes = {
//   password:0,
//   confirmPassword:0,
//   newPassword:0
// };

//Add a pre save hook
UserSchema.pre('save', function preSaveHook(next){
  debug('presave user');

  let model = this;

  //Generate a salt factor

  bcrypt.genSalt(config.SALT_LENGTH, function genSalt(err, salt){
    if (err){ return next(err);}
     
    //hash the password using the generated salt
    bcrypt.hash(model.password, salt, function hashPassword(err, hash){
      if (err){ return next(err);}

      var now = moment().toISOString();

      model.password = hash;
      model.date_created = now;
      model.last_modified = now;
      next();      
    });
  });
});

//compare password
UserSchema.methods.checkPassword = function checkPassword(password, cb){
  bcrypt.compare(password, this.password, function done(err, isMatch){
    if (err){ return cb(err); }

    cb(null, isMatch);
  });
};

// Export User Model
module.exports = mongoose.model('User', UserSchema);