// Load Module Dependencies
var express   =   require('express');

var athlete = require('../controllers/athlete');

// Create a Router
var router = express.Router();

//POST /athletes/create
router.post('/create', athlete.createAthlete);

//GET /athletes/all
router.get('/all', athlete.getAthletes);

//GET /athletes/:_id
router.get('/:_id', athlete.fetchAthlete);

// PUT /athletes/:_id
router.put('/:_id', athlete.updateAthlete);

//DELETE /athletes/:_id
router.delete('/:_id', athlete.deleteAthlete);

// Export Router
module.exports = router;