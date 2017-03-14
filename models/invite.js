// Load Module Dependencies
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var inviteSchema = new Schema({
    message :{ type: String},
    run     :{ type: Schema.Types.ObjectId, ref:'Run'},
    invitees:[{ type: Schema.Types.ObjectId, ref:'User'}]

}, { versionKey: false });

// Export Invite Model
module.exports = mongoose.model('Invite', inviteSchema);