
// Module definition

//Load module dependencies
 
var mongoose = require('mongoose');

var Schema   = mongoose.Schema;
var moment = require('moment');

// New run schema instance 
var runSchema = new Schema({
    name           : { type: String }, 
    location       : { type: String },
    scheduled_date : { type: Date},
    start_time     : { type: Date },
    end_time       : { type: Date },
    creator        : { type: String, ref:'Profile'},
    participants   : [{ type: Schema.Types.ObjectId, ref:'User'}],
    visibility     : { type: String, },
    date_created   : { type: Date},
    last_modified  : { type: Date}
    
}, { versionKey: false });

// Expose the run model
module.exports = mongoose.model('Run',runSchema);

