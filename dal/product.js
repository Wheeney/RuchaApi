/**
 * Load module dependencies
 */
var debug = require('debug')('super-api');
var moment = require('moment');

var Product = require('../models/product');

var population = [{path:'transaction'},{path:'cashier'},{path:'manager'}];


/**
 * create a product
 * 
 * @desc create a new product and save the data in the database
 * @param {object} productData  data for the product being created.
 * @param {function} cb  callback for once the product has been created
 */
exports.create = function create(productData, cb){
    debug('Creating a new product');

    //create a new product
    var newProduct = new Product(productData);

    newProduct.save(function saveProduct(err, product){
        if(err){
            return cb(err);
        };

        //save the id of each created product
        exports.get({_id:product._id}, function(err, product){
            if (err){
                return cb(err)
            };
            cb(null, product);
        });
        return;

    });
};

/**
 * Delete a product
 * @desc delete data of the product with the given id
 * 
 * @param {object} query  Query object
 * @param {function} cb  callback for once delete is complete
 */
exports.delete = function deleteItem(query, cb){
    debug('deleting product:', query);
    
    Product
             .findOne(query)
             .populate(population)
             .exec(function deleteProduct(err, product){
                 if(err){ return cb(err); }

                 if(!product){
                     return cb(new Error('Selected product does not exist'));
                 };

                 product.remove(function(err){
                     if(err){ return cb(err);}

                     cb(null, product);
                 });
             });
};

/**
 * update a product
 * @desc update data of a product with a given id
 * 
 * @param {object} query  Query object
 * @param {object} updates update data
 * @param {function} cb  callback for once update is complete
 * 
 */
exports.update = function update(query, updates, cb){
    debug('updating product:', query);
    var now = moment().toISOString();
    updates.last_modified = now;
    Product
       .findOneAndUpdate(query, updates)
       .populate(population)
       .exec(function updateProduct(err, product){
           if (err){ return cb(err);}
           cb(null, product || {});
       });
};
/**
 * Get a product
 * 
 * @desc get a product with a specific id from db
 * 
 * @param {object} query  Query object
 * @param {function} cb  callback for once fetch is complete
 */
exports .get = function get(query, cb){
    debug('Fetching product:', query);
    Product
       .findOne(query)
       .populate(population)
       .exec(function getProduct(err, product){
           if(err){ return cb(err);}
           cb(null, product);
       });
};
/**
 * Get a collection of products
 * 
 * @desc Get a collection of products from the database
 * 
 * @param {object} query  Query object
 * @param {Function} cb Callback for once fetch is complete
 */
exports.getCollection = function getCollection(query, cb){
    debug('Getting a collection of products');
    Product
       .find(query)
       .populate(population)
       .exec(function getProductsCollection(err, products){
           if(err){ return cb(err);}
           cb(null, products);
       });
};

