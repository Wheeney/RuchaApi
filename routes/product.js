// Load Module Dependencies
var express   =   require('express');

var product = require('../controllers/product');

// Create a Router
var router = express.Router();

//POST /products/newproduct
router.post('/new', product.createProduct);

//GET ALL /products/all
router.get('/all', product.getProducts);

//GET /products/productId
router.get('/:_id', product.getProduct);

//DELETE /products/productId
router.delete('/:_id', product.removeProduct);

//UPDATE /products/productId
router.put('/:_id', product.updateProduct);

// Export Router
module.exports = router;
