// Load Module Dependencies
var express   =   require('express');
var multer  = require('multer');
var upload = multer({ dest: 'uploads/' });

var profile = require('../controllers/profile');

// Create a Router
var router = express.Router();

router.post('/uploads', upload.any(''), function (req, res, next){
    res.send(req.files);
});

// GET /profiles/all
router.get('/all', profile.getProfiles);


// GET /profiles/:profileId
router.get('/:_id', profile.getProfile);


// PUT /users/:userId
router.put('/:_id', profile.updateProfile);




// Export Router
module.exports = router;

