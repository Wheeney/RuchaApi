/**
 * Load module dependencies
 */

var mongoose = require('mongoose');

var Schema   = mongoose.Schema;

// Define conversation schema
var conversationSchema = new Schema({  
  participants: [{ type: Schema.Types.ObjectId, ref: 'User'}],
}, { versionKey: false });

//Expose the conversation schema
module.exports = mongoose.model('Conversation', conversationSchema);  