// Load Module Dependencies
var express   =   require('express');

var chat = require('../controllers/chat');

// Create a Router
var router = express.Router();

//
router.get('/', chat.getConversations);

router.get('/:conversationId', chat.getConversation);

router.post('/:conversationId', chat.sendReply);

router.post('/new/:recipient', chat.newConversation);


// Export Router
module.exports = router;

