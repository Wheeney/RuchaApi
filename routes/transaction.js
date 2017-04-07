// Load Module Dependencies
var express   =   require('express');

var transaction  = require('../controllers/transaction');

// Create a Router
var router = express.Router();

// POST /transaction/signup
router.post('/new', transaction.createTransaction);


// GET /transaction/all
router.get('/all', transaction.getTransaction);


// GET /transaction/:transactionId
router.get('/:_id', transaction.getTransaction);


// PUT /transaction/:transactionId
router.put('/:_id', transaction.updateTransaction);

// DELETE /transaction/:transactionId
router.delete('/:_id', transaction.removeTransaction);



// Export Router
module.exports = router;