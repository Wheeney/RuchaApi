// Load Module Dependencies
var express   =   require('express');

var cashier = require('../controllers/cashier');

// Create a Router
var router = express.Router();

//GET /cashiers/all
router.get('/all', cashier.getCashiers);

//GET /cashier/:cashierId
router.get('/:_id', cashier.getCashier);

// PUT /cashiers/:cashierId
router.put('/:_id', cashier.updateCashier);

// Export Router
module.exports = router;