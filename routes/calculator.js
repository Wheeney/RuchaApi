// Load Module Dependencies
var express   =   require('express');

var calculator = require('../controllers/calculator');

// Create a Router
var router = express.Router();

//POST /calculator/new
router.post('/create', calculator.createCalculator);

//GET ALL /calculator/all
router.get('/all', calculator.getCalculators);

//GET /calculator/calculatorId
router.get('/:_id', calculator.getCalculator);

//DELETE /calculator/calculatorId
router.delete('/:_id', calculator.removeCalculator);

//UPDATE /calculator/calculatorId
router.put('/:_id', calculator.updateCalculator);


// Export Router
module.exports = router;

