//Load module dependencies

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
    transaction   : { type: Schema.Types.ObjectId, ref: 'Transaction' },
    cashier       : { type: Schema.Types.ObjectId, ref: 'Cashier' },
    manager         : { type: Schema.Types.ObjectId, ref: 'Manager' },
    serial_no     : { type: String},
    color         : { type: String},
    brand_name    : { type: String },
    product_type  : { type: String },
    description   : { type: String },
    category      : { type: String, default:'Select' },
    manufacturer  : { type: String },
    units         : { type: String },
    quantity      : { type: Number },
    currency      : { type: String, default:'birr'},
    retail_price  : { type: Number },
    sale_price    : { type: Number },
    available     : { type: Boolean, default:true },
    rollBack      : { type: Boolean, default:true},
    date_created  : { type:Date},
    last_modified : { type:Date}
    
});

//Export the schema
module.exports = mongoose.model('Product', productSchema);