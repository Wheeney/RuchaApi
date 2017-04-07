// Load Module Dependencies

var mongoose  = require('mongoose');

var Schema  = mongoose.Schema;

//Define manager  attributes
var managerSchema = new Schema({
    profile      : { type: Schema.Types.ObjectId, ref: 'Profile' },
    product      : { type: Schema.Types.ObjectId, ref: 'Product' },
    date_created : { type: Date },
    last_modified: { type: Date }
    
});

//Export manager model
module.exports = mongoose.model('Manager', managerSchema);