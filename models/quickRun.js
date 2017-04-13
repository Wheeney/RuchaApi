
//Load module dependencies
 
var mongoose = require('mongoose');
var paginator = require('mongoose-paginate');
var moment = require('moment');

var Schema   = mongoose.Schema;

// New run schema instance 
var quickRunSchema = new Schema({
    starting_point : {
      name:{ type:String},
      lat :{ type:Number},
      long:{ type:Number}
    },
    ending_point   : { 
      name:{ type:String},
      lat :{ type:Number},
      long:{ type:Number}
    },
    distance       : { type: Number },
    start_time     : { type: String },
    end_time       : { type: String },
    time_taken     : { type: String },
    averagePace    : { type: String},
    calories_burned: { type: String},
    kcal_per_min   : { type: String },
    date_created   : { type: Date},
    last_modified  : { type: Date}
    
}, { versionKey: false });


//Middleware to support pagination
quickRunSchema.plugin(paginator);

/**
 * Pre save middleware.
 *
 * @desc Sets the date_created and last_modified attributes prior to save.
 * @param {next} next middleware dispatcher
 */
quickRunSchema.pre('save', function preSaveMiddleware(next) {
  var run = this;
  // set date modifications
  var now = moment().toISOString();

  run.date_created = now;
  run.last_modified = now;

  next();

});
// Expose the run model
module.exports = mongoose.model('QuickRun',quickRunSchema);

