// Load Module Dependencies
var express   =   require('express');

var manager = require('../controllers/manager');

// Create a Router
var router = express.Router();

//GET /managers/all
router.get('/all', manager.getManagers);

//GET /manager/:managerId
router.get('/:_id', manager.getManager);

// PUT /managers/:managerId
router.put('/:_id', manager.updateManager);

// Export Router
module.exports = router;