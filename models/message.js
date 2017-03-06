/**
 * Load module dependencies
 */

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var messageSchema = new Schema({  
  conversationId : { type: Schema.Types.ObjectId, required: true },
  body           : { type: String,required: true },
  author         : { type: Schema.Types.ObjectId,ref: 'User'},
  date_created   : { type: Date },
  last_modified  : { type : Date}
});

//Expose the messages schema
module.exports = mongoose.model('Message', messageSchema);  
