// Load Module Dependencies

var mongoose  = require('mongoose');

var Schema  = mongoose.Schema;

//Define transaction attributes
var transactionSchema = new Schema({
    manager           : { type: Schema.Types.ObjectId, ref: 'Manager' },
    cashier         : { type: Schema.Types.ObjectId, ref: 'Cashier' },
    product_name    : { type: Schema.Types.ObjectId, ref: 'Product' },
    brand           : { type: String, ref: 'Product' },
    product_type    : { type: String, ref: 'Product' },
    quantity        : { type: Number, ref: 'Product' },
    price           : { type: Number, ref: 'Product' },
    transaction_type: { type: String, default:'cash' },
    tax             : { type: Number },
    status          : { type: String, default:'approved'},
    total           : { type: Number },
    date_created    : { type: Date },
    last_modified   : { type: Date }
    
});

//Export transaction model
module.exports = mongoose.model('Transaction', transactionSchema);