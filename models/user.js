/**
 * Load Module Dependencies
 */
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt');
var moment   = require('moment');
var config   = require('../config');
var debug    = require('debug')('api:model-user');
var paginator= require('mongoose-paginate');

var Schema   = mongoose.Schema;

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

/**
 * Model Attributes to expose
 */
UserSchema.statics.whitelist = {
  username:1,
  password:1,
  role:1,
  realm:1,
  status:1,
  profile:1,
  last_login:1,
  date_created:1,
  last_modified:1
};

//Middleware to support pagination
UserSchema.plugin(paginator);

/**
 * Compare the submitted password and the stored one
 *
 * @param {String} password submitted password
 * @param {Function} cb Callback function
 */
UserSchema.methods.checkPassword = function checkPassword(password, cb){
  bcrypt.compare(password, this.password, function done(err, isMatch){
    if (err){ return cb(err); }

    cb(null, isMatch);
  });
};

/**
 * Pre save middleware.
 */
UserSchema.pre('save', function preSaveHook(next){
  debug('presave user');
  var model = this;

  if (!model.isModified('password')) return next();

  //Generate a salt factor
  bcrypt.genSalt(config.SALT_LENGTH, function genSalt(err, salt){
    if (err){ return next(err);}
     
    //hash the password using the generated salt
    bcrypt.hash(model.password, salt, function hashPassword(err, hash){
      if (err){ return next(err);}

      //Set the date_created and last_modified attributes
      var now = moment().toISOString();

      model.password = hash;
      model.date_created = now;
      model.last_modified = now;
      
      next();      
    });
  });
});

// Export User Model
module.exports = mongoose.model('User', UserSchema);