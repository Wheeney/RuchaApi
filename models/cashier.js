// Load Module Dependencies

var mongoose  = require('mongoose');

var Schema  = mongoose.Schema;

//Define cashier attributes
var cashierSchema = new Schema({
    profile      : { type: Schema.Types.ObjectId, ref:'Profile'},
    transaction  : [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
    product      : [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    username         : { type: String, ref:'User'},
    station      : { type: String},
    date_created : { type: Date },
    last_modified: { type: Date }
    
});

//Export cashier model
module.exports = mongoose.model('Cashier', cashierSchema);