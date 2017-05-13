// Load Module Dependencies

var mongoose  = require('mongoose');

var Schema  = mongoose.Schema;

//Define admin  attributes
var adminSchema = new Schema({
    profile      : { type: Schema.Types.ObjectId, ref: 'Profile' },
    date_created : { type: Date },
    last_modified: { type: Date }
    
});

//Export admin model
module.exports = mongoose.model('Admin', adminSchema);