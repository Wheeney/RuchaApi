// Load Module Dependencies
var express   =   require('express');

var kit = require('../controllers/kit');

// Create a Router
var router = express.Router();

//POST /kits/create
router.post('/create', kit.createKit);

//GET /kits/all
router.get('/all', kit.getKits);

//GET /kits/:_id
router.get('/:_id', kit.fetchKit);

// PUT /kits/:_id
router.put('/:_id', kit.updateKit);

//DELETE /kits/:_id
router.delete('/:_id', kit.deleteKit);

// Export Router
module.exports = router;