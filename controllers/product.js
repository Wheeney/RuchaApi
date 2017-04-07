/**
 * Load module dependencies
 */
var EventEmitter = require('events').EventEmitter;

var moment = require('moment');
var debug = require('debug')('super-api');

var productDal = require('../dal/product');
var transactionDal = require('../dal/transaction');



exports.createProduct = function createProduct(req, res, next){
    debug('creating a product');

    var body = req.body;
    var workflow = new EventEmitter();

    //validate the product
    workflow.on('validateProduct', function validateProduct(){
        debug('validating product');

        req.checkBody('brand', 'Brand is empty').notEmpty();
        req.checkBody('product_type', 'product_type is empty').notEmpty();
        req.checkBody('description', 'description is empty').notEmpty();
        req.checkBody('category', 'category is invalid').notEmpty().isIn('beverages', 'bakery','canned','dairy','frozen');
        req.checkBody('vendor', 'vendor is empty').notEmpty();
        req.checkBody('units', 'units is empty').notEmpty();
        req.checkBody('quantity', 'quantity is empty').notEmpty();
        req.checkBody('price', 'price is empty').notEmpty();
        req.checkBody('original_price', 'original_pice is empty').notEmpty();
        req.checkBody('transaction_type', 'Transaction_type is invalid').isIn('cash', 'debit');
        

        var validationErrors = req.validationErrors();

        if(validationErrors){
            res.status(400);
            res.json(validationErrors);
        } else{
             workflow.emit('createProduct');
        };
    });
    workflow.on('createProduct', function createProduct(){
        //create product data
        productDal.create({
            product_type:body.product_type,
            description:body.description,
            category:body.category,
            vendor:body.vendor,
            brand:body.brand,
            currency:body.currency,
            price:body.price,
            original_price:body.original_price,
            units:body.units,
            quantity:body.quantity
  
        }, function cb(err, product){
            if(err){
                return next(err);
            };
            workflow.emit('createTransaction', product);
        });
    });
    workflow.on('createTransaction', function createTransaction(product){
        //create transaction data
        transactionDal.create({
            product:product._id,
            quantity:body.quantity,
            brand:body.brand,
            product_type:body.product_type,
            price:body.price,
            original_price:body.original_price

        }, function cb(err, product){
            if (err){
                return next(err);
            };
            workflow.emit('respond', product);
        });
    })
    workflow.on('respond', function respond(product){
        res.status(201).json(product);
    });
    workflow.emit('validateProduct');
};
/**
 * get a single product
 * 
 * @desc Fetch a single product from the database by Id
 */
exports.getProduct = function getProduct(req, res, next){
    debug('Fetching a product:', req.params._id);

    var query = { _id:req.params._id };

    productDal.get(query, function getcb(err, product){
        if (err) { return next(err);}

        res.json(product);
    });
};

exports.removeProduct = function removeProduct(req, res,next){
     debug('deleting product:', req.params._id);

    var query = { _id:req.params._id };

    productDal.delete(query, function deletecb(err, product){
        if(err) { return next(err);}

        res.json(product);
    });
};

exports.updateProduct = function updateProduct(req, res, next){
    debug('updating product:', req.params._id);

    var query = { _id:req.params._id };
    var body  = req.body;

    productDal.update(query, body, function updatecb(err, product){
        if (err) { return next(err);}

        res.json(product);
    });
};

exports.getProducts = function getProducts(req, res, next){
    debug('Fetching all products');

    var query = {};
    
    productDal.getCollection(query, function getProductCollections(err, products){
        if(err){
            return next(err);
        }
        res.json(products);
    })
};