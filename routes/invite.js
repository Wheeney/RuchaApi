// Load Module Dependencies
var express = require('express');
var invite = require('../controllers/invite');

// Create a Router
var router = express.Router();

//POST runs/create 
router.post('/create', invite.createInvite);

router.get('/all', invite.getInvites);

router.get('/:_id', invite.fetchInvite);

router.get('/:_id/accept', invite.acceptInvite);

router.put('/:_id', invite.updateInvite);

router.delete('/:_id', invite.deleteInvite);

// Export Router
module.exports = router;