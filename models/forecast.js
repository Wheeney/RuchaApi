// Load Module Dependencies

var mongoose  = require('mongoose');

var Schema  = mongoose.Schema;

//Define admin attributes
var forecastSchema = new Schema({
    location : {
        name     : { type: String },
        region   : { type: String },
        country  : { type: String },
        lat      : { type: Schema.Types.mixed },
        long     : { type: Schema.Types.mixed },
        tz_id    : { type: String },
        localtime: { type: Date }
    },
    current : {
        last_updated: { type: Date },
        temp_c      : { type: Number},
        temp_f      : { type: Number},
        condition   : {
            text : { type: String },
            icon : { type: String },
            code : { type: String }
        },
        wind_degree :{ type: Number },
        wind_dir    :{ type: String },
        precip_mm   :{ type: Number },
        humidity    :{ type: Number },
        cloud       :{ type: Number }
    }
    
}, { versionKey: false });

//Export admin model
module.exports = mongoose.model('Forecast', forecastSchema);