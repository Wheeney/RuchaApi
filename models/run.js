
// Module definition

//Load module dependencies
 
var mongoose = require('mongoose');
var paginator = require('mongoose-paginate');
var moment = require('moment');

var Schema   = mongoose.Schema;


// New run schema instance 
var runSchema = new Schema({
    name           : { type: String }, 
    location       : { type: String },
    scheduled_date : { type: Date},
    creator        : { type: String, ref:'Profile'},
    participants   : [{ type: Schema.Types.ObjectId, ref:'User'}],
    pendingInvites : [{ type: Schema.Types.ObjectId, ref:'Profile'}],
    invitees       : [{ type: Schema.Types.ObjectId, ref:'User'}],
    limit          : { type: Number},
    visibility     : { type: String, },
    starting_point : {
      name:{ type:String},
      lat :{ type:Number},
      long:{ type:Number}
    },
    ending_point   : { 
      name:{ type:String},
      lat :{ type:Number},
      long:{ type:Number}},
    distance       : { type: Number },
    start_time     : { type: Number },
    end_time       : { type: Number },
    time_taken     : { type: String },
    averagePace    : { type: String},
    calories_burned: { type: Number},
    kcal_per_min   : { type: String },
    date_created   : { type: Date},
    last_modified  : { type: Date}
    
}, { versionKey: false });


//Middleware to support pagination
runSchema.plugin(paginator);


/**
 * Pre save middleware.
 *
 * @desc Sets the date_created and last_modified attributes prior to save.
 * @param {next} next middleware dispatcher
 */
runSchema.pre('save', function preSaveMiddleware(next) {
  var run = this;

  // set date modifications
  var now = moment().toISOString();

  run.date_created = now;
  run.last_modified = now;

  next();

});
// Expose the run model
module.exports = mongoose.model('Run',runSchema);

