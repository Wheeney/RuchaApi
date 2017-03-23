// Load Module Dependencies
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var inviteSchema = new Schema({
    run     :{ type: Schema.Types.ObjectId, ref:'Run'},
    invitees:[{ type: Schema.Types.ObjectId, ref:'Profile'}]

}, { versionKey: false });

// Export Invite Model
module.exports = mongoose.model('Invite', inviteSchema);