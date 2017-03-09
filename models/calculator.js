// Load Module Dependencies

var mongoose  = require('mongoose');

var Schema  = mongoose.Schema;

//Define admin attributes
var calculatorSchema = new Schema({
    user           : { type: Schema.Types.ObjectId, ref: 'User' },
    profile        : { type: Schema.Types.ObjectId, ref: 'Profile' },
    age            : { type: Number},
    heart_rate     : { type: String},
    gender         : { type: String},
    distance       : { type: Number },
    time           : { type: String },
    weight         : { type: Number},
    averagePace    : { type: String},
    calories_burned: { type: Number},
    kcal_per_min   : { type : String },
    date_created   : { type: Date },
    last_modified  : { type: Date }
    
}, { versionKey: false });

//Export admin model
module.exports = mongoose.model('Calculator', calculatorSchema);